import type { ActionFunctionArgs } from "react-router";
import { json, redirect, type useActionData } from "react-router";
import { parseWithValibot } from "conform-to-valibot";
import { flatten, safeParse } from "valibot";
import { type Prisma, prisma } from "~/lib/prisma";
import { assertNotFound } from "~/lib/response";
import { importRoute } from "~/routePath/importRoute";
import { importItems, itemImportSchema } from "./importItems";
import { type ImportSetting, schema } from "./schema";

export async function runImportAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const importSetting = submission.value;
  const content = await getFileContent(importSetting);
  const importHistoryId = importSetting.dryRun
    ? content.importHistoryId
    : (await saveHistory(content.fileName, content.parsedJson)).id;

  const validated = safeParse(itemImportSchema, content.parsedJson);
  if (!validated.success) {
    const error = JSON.stringify(flatten(validated.issues), null, 2);
    return json({
      ...submission.reply(),
      error: {
        fileContent: [error],
      },
    });
  }

  if (!importSetting.dryRun) {
    await importItems(validated.output, importSetting.isReplace);
  }

  return redirect(importRoute({ pathParams: { importHistoryId } }));
}

export type ActionData = ReturnType<
  typeof useActionData<typeof runImportAction>
>;

const getFileContent = async (importSetting: ImportSetting) => {
  if (importSetting.targetKind === "file") {
    const fileContent = await importSetting.targetFile.text();
    return {
      fileName: importSetting.targetFile.name,
      parsedJson: JSON.parse(fileContent),
    };
  }

  const history = await prisma.importHistory.findUnique({
    where: { id: importSetting.targetHistoryId },
  });
  assertNotFound(history, "import history is not found");

  return {
    fileName: history.name,
    parsedJson: history.json,
    importHistoryId: history.id,
  };
};

const saveHistory = async (
  fileName: string,
  parsedJson: Prisma.InputJsonObject,
) => {
  return await prisma.importHistory.upsert({
    where: {
      name: fileName,
    },
    create: {
      name: fileName,
      json: parsedJson,
      at: new Date(),
    },
    update: {
      name: fileName,
      json: parsedJson,
      at: new Date(),
    },
    select: {
      id: true,
    },
  });
};

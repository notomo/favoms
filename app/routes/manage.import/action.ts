import type { ActionFunctionArgs } from "@remix-run/node";
import { parseWithValibot } from "conform-to-valibot";
import { safeParse, flatten } from "valibot";
import { json, redirect, useActionData } from "@remix-run/react";
import { importRoute } from "~/routePath";
import { importItems } from "~/.server/persist/item";
import { schema } from "./schema";
import { itemImportSchema } from "~/lib/schema/item";

export async function runImportAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const fileContent = await submission.value.targetFile.text();
  const parsedJson = JSON.parse(fileContent);
  const validated = safeParse(itemImportSchema, parsedJson);
  if (!validated.success) {
    const error = JSON.stringify(flatten(validated.issues), null, 2);
    return json({
      ...submission.reply(),
      error: {
        ["fileContent"]: [error],
      },
    });
  }

  if (!submission.value.dryRun) {
    await importItems(validated.output, submission.value.isReplace);
  }

  return redirect(importRoute());
}

export type ActionData = ReturnType<
  typeof useActionData<typeof runImportAction>
>;

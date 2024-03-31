import type { ActionFunctionArgs } from "@remix-run/node";
import { parseWithValibot } from "conform-to-valibot";
import { safeParse, flatten } from "valibot";
import { json, redirect, useActionData } from "@remix-run/react";
import { importRoute } from "~/routePath";
import { Prisma, prisma } from "~/lib/prisma";
import { schema } from "./schema";
import { ItemImport, itemImportSchema } from "~/lib/schema/item";
import { listToRecord, uniqueListByKey } from "~/lib/collection";
import { assertNotFound } from "~/lib/response";

export async function runImportAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  let fileName = "";
  let parsedJson = null;
  let importHistoryId: number | undefined = undefined;
  if (submission.value.targetKind === "file") {
    const fileContent = await submission.value.targetFile.text();
    fileName = submission.value.targetFile.name;
    parsedJson = JSON.parse(fileContent);
  } else {
    const history = await prisma.importHistory.findUnique({
      where: { id: submission.value.targetHistoryId },
    });
    assertNotFound(history, "import history is not found");
    fileName = history.name;
    parsedJson = history.json;
    importHistoryId = history.id;
  }

  if (!submission.value.dryRun) {
    importHistoryId = (await saveHistory(fileName, parsedJson)).id;
  }

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

  return redirect(importRoute(importHistoryId));
}

export type ActionData = ReturnType<
  typeof useActionData<typeof runImportAction>
>;

async function importItems(itemImport: ItemImport, isReplace = false) {
  const books = itemImport.books;
  const videos = itemImport.videos;

  const uniqueBookAuthors = uniqueListByKey(
    books.map((x) => x.authors).flat(),
    "name",
  );
  const uniqueBookPublishers = uniqueListByKey(
    books.map((x) => x.publishers).flat(),
    "name",
  );
  const uniqueCasts = uniqueListByKey(
    videos.map((x) => x.casts).flat(),
    "name",
  );

  const [bookAuthors, bookPublishers, casts] = await prisma.$transaction(
    async (tx) => {
      return await Promise.all([
        Promise.all([
          ...uniqueBookAuthors.map((x) => {
            return tx.bookAuthor.upsert({
              where: { name: x.name },
              create: x,
              update: x,
              select: {
                id: true,
                name: true,
              },
            });
          }),
        ]),
        Promise.all([
          ...uniqueBookPublishers.map((x) => {
            return tx.bookPublisher.upsert({
              where: { name: x.name },
              create: x,
              update: x,
              select: {
                id: true,
                name: true,
              },
            });
          }),
        ]),
        Promise.all([
          ...uniqueCasts.map((x) => {
            return tx.cast.upsert({
              where: { name: x.name },
              create: x,
              update: x,
              select: {
                id: true,
                name: true,
              },
            });
          }),
        ]),
      ]);
    },
  );

  const bookAuthorRecord = listToRecord(bookAuthors, "name");
  const bookPublisherRecord = listToRecord(bookPublishers, "name");
  const castRecord = listToRecord(casts, "name");

  await prisma.$transaction([
    ...(isReplace ? [prisma.item.deleteMany({ where: {} })] : []),
    ...books.map((x) => {
      return prisma.item.create({
        data: {
          book: {
            create: {
              title: x.title,
              titleRuby: x.titleRuby,
              publishedAt: x.publishedAt,
              authors: {
                connect: x.authors.map((author) => ({
                  id: bookAuthorRecord[author.name].id,
                })),
              },
              publishers: {
                connect: x.publishers.map((publisher) => ({
                  id: bookPublisherRecord[publisher.name].id,
                })),
              },
            },
          },
        },
      });
    }),
    ...videos.map((x) => {
      return prisma.item.create({
        data: {
          video: {
            create: {
              title: x.title,
              titleRuby: x.titleRuby,
              publishedAt: x.publishedAt,
              casts: {
                connect: x.casts.map((cast) => ({
                  id: castRecord[cast.name].id,
                })),
              },
            },
          },
        },
      });
    }),
  ]);
}

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

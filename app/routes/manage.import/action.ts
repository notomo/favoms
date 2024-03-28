import type { ActionFunctionArgs } from "@remix-run/node";
import { parseWithValibot } from "conform-to-valibot";
import { safeParse, flatten } from "valibot";
import { json, redirect, useActionData } from "@remix-run/react";
import { importRoute } from "~/routePath";
import { prisma } from "~/lib/prisma";
import { schema } from "./schema";
import { ItemImport, itemImportSchema } from "~/lib/schema/item";
import { listToRecord, uniqueListByKey } from "~/lib/collection";

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

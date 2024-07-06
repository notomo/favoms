import { prisma } from "~/lib/prisma";
import { listToRecord, uniqueListByKey } from "~/lib/collection";
import {
  object,
  array,
  literal,
  nullable,
  string,
  minLength,
  maxLength,
  InferOutput,
  transform,
  pipe,
} from "valibot";
import { itemIdSchema, stringIdSchema } from "~/lib/schema/id";

const nameSchema = ({ min, max }: { min: number; max: number }) => {
  return pipe(string(), minLength(min), maxLength(max));
};

const bookAuthorSchema = object({
  id: stringIdSchema,
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const bookPublisherSchema = object({
  id: stringIdSchema,
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const bookSchema = object({
  kind: literal("book"),
  id: itemIdSchema,
  title: nameSchema({ min: 1, max: 1000 }),
  titleRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
  authors: array(bookAuthorSchema),
  publishers: array(bookPublisherSchema),
  // TODO: validate date format
  publishedAt: pipe(
    nullable(string()),
    transform((x) => (x ? new Date(x) : null)),
  ),
});

const castSchema = object({
  id: stringIdSchema,
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const videoSchema = object({
  kind: literal("video"),
  id: itemIdSchema,
  title: nameSchema({ min: 1, max: 1000 }),
  titleRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
  casts: array(castSchema),
  // TODO: validate date format
  publishedAt: pipe(
    nullable(string()),
    transform((x) => (x ? new Date(x) : null)),
  ),
});

export const itemImportSchema = object({
  books: array(bookSchema),
  videos: array(videoSchema),
});

type ItemImport = InferOutput<typeof itemImportSchema>;

export async function importItems(itemImport: ItemImport, isReplace = false) {
  const books = itemImport.books;
  const videos = itemImport.videos;

  const uniqueBookAuthors = uniqueListByKey(
    books.map((x) => x.authors).flat(),
    "id",
  );
  const uniqueBookPublishers = uniqueListByKey(
    books.map((x) => x.publishers).flat(),
    "id",
  );
  const uniqueCasts = uniqueListByKey(videos.map((x) => x.casts).flat(), "id");

  await prisma.$transaction(async (tx) => {
    return await Promise.all([
      Promise.all([
        ...uniqueBookAuthors.map((x) => {
          return tx.bookAuthor.upsert({
            where: { id: x.id },
            create: x,
            update: x,
            select: {
              id: true,
            },
          });
        }),
      ]),
      Promise.all([
        ...uniqueBookPublishers.map((x) => {
          return tx.bookPublisher.upsert({
            where: { id: x.id },
            create: x,
            update: x,
            select: {
              id: true,
            },
          });
        }),
      ]),
      Promise.all([
        ...uniqueCasts.map((x) => {
          return tx.cast.upsert({
            where: { id: x.id },
            create: x,
            update: x,
            select: {
              id: true,
            },
          });
        }),
      ]),
    ]);
  });

  const items = isReplace
    ? []
    : await prisma.item.findMany({
        select: { id: true },
      });
  const itemRecord = listToRecord(items, "id");

  await prisma.$transaction([
    ...(isReplace ? [prisma.item.deleteMany({ where: {} })] : []),
    ...books
      .map((x) => {
        if (itemRecord[x.id]) {
          return null;
        }
        return prisma.item.create({
          data: {
            id: x.id,
            book: {
              create: {
                title: x.title,
                titleRuby: x.titleRuby,
                publishedAt: x.publishedAt,
                authors: {
                  connect: x.authors.map((author) => ({
                    id: author.id,
                  })),
                },
                publishers: {
                  connect: x.publishers.map((publisher) => ({
                    id: publisher.id,
                  })),
                },
              },
            },
          },
        });
      })
      .filter((x) => x !== null),
    ...videos
      .map((x) => {
        if (itemRecord[x.id]) {
          return null;
        }
        return prisma.item.create({
          data: {
            id: x.id,
            video: {
              create: {
                title: x.title,
                titleRuby: x.titleRuby,
                publishedAt: x.publishedAt,
                casts: {
                  connect: x.casts.map((cast) => ({
                    id: cast.id,
                  })),
                },
              },
            },
          },
        });
      })
      .filter((x) => x !== null),
  ]);
}

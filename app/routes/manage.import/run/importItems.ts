import { prisma } from "~/lib/prisma";
import { listToRecord, uniqueListByKey as uniqueByKey } from "~/lib/collection";
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

  const [bookAuthors, bookPublishers, casts] = isReplace
    ? [[], [], []]
    : await Promise.all([
        prisma.bookAuthor.findMany({
          select: { id: true },
        }),
        prisma.bookPublisher.findMany({
          select: { id: true },
        }),
        prisma.cast.findMany({
          select: { id: true },
        }),
      ]);
  const bookAuthorRecord = listToRecord(bookAuthors, "id");
  const bookPublisherRecord = listToRecord(bookPublishers, "id");
  const castRecord = listToRecord(casts, "id");

  await prisma.$transaction([
    ...(isReplace
      ? [
          prisma.bookAuthor.deleteMany({ where: {} }),
          prisma.bookPublisher.deleteMany({ where: {} }),
          prisma.cast.deleteMany({ where: {} }),
        ]
      : []),
    prisma.bookAuthor.createMany({
      data: uniqueByKey(books.map((x) => x.authors).flat(), "id").filter(
        (x) => bookAuthorRecord[x.id] == undefined,
      ),
    }),
    prisma.bookPublisher.createMany({
      data: uniqueByKey(books.map((x) => x.publishers).flat(), "id").filter(
        (x) => bookPublisherRecord[x.id] == undefined,
      ),
    }),
    prisma.cast.createMany({
      data: uniqueByKey(videos.map((x) => x.casts).flat(), "id").filter(
        (x) => castRecord[x.id] == undefined,
      ),
    }),
  ]);

  const items = isReplace
    ? []
    : await prisma.item.findMany({
        select: { id: true },
      });
  const itemRecord = listToRecord(items, "id");

  const itemIds = [
    ...books
      .map((x) => ({ id: x.id }))
      .filter((x) => itemRecord[x.id] === undefined),
    ...videos
      .map((x) => ({ id: x.id }))
      .filter((x) => itemRecord[x.id] === undefined),
  ];

  await prisma.$transaction([
    ...(isReplace ? [prisma.item.deleteMany({ where: {} })] : []),
    prisma.item.createMany({
      data: itemIds,
    }),
    ...books
      .map((x) => {
        if (itemRecord[x.id]) {
          return null;
        }
        return prisma.book.create({
          data: {
            itemId: x.id,
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
        });
      })
      .filter((x) => x !== null),
    ...videos
      .map((x) => {
        if (itemRecord[x.id]) {
          return null;
        }
        return prisma.video.create({
          data: {
            itemId: x.id,
            title: x.title,
            titleRuby: x.titleRuby,
            publishedAt: x.publishedAt,
            casts: {
              connect: x.casts.map((cast) => ({
                id: cast.id,
              })),
            },
          },
        });
      })
      .filter((x) => x !== null),
  ]);
}

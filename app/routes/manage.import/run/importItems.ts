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
  type InferOutput,
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
  const [bookAuthors, bookPublishers, casts, items] = isReplace
    ? [[], [], [], []]
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
        prisma.item.findMany({
          select: { id: true },
        }),
      ]);
  const bookAuthorRecord = listToRecord(bookAuthors, "id");
  const bookPublisherRecord = listToRecord(bookPublishers, "id");
  const castRecord = listToRecord(casts, "id");

  const itemRecord = listToRecord(items, "id");
  const nonExistedBooks = itemImport.books.filter(
    (x) => itemRecord[x.id] === undefined,
  );
  const nonExistedVideos = itemImport.videos.filter(
    (x) => itemRecord[x.id] === undefined,
  );

  await prisma.$transaction([
    ...(isReplace
      ? [
          prisma.bookAuthor.deleteMany({ where: {} }),
          prisma.bookPublisher.deleteMany({ where: {} }),
          prisma.cast.deleteMany({ where: {} }),
          prisma.item.deleteMany({ where: {} }),
        ]
      : []),
    prisma.bookAuthor.createMany({
      data: uniqueByKey(
        nonExistedBooks.flatMap((x) => x.authors),
        "id",
      ).filter((x) => bookAuthorRecord[x.id] === undefined),
    }),
    prisma.bookPublisher.createMany({
      data: uniqueByKey(
        nonExistedBooks.flatMap((x) => x.publishers),
        "id",
      ).filter((x) => bookPublisherRecord[x.id] === undefined),
    }),
    prisma.cast.createMany({
      data: uniqueByKey(
        nonExistedVideos.flatMap((x) => x.casts),
        "id",
      ).filter((x) => castRecord[x.id] === undefined),
    }),
    prisma.item.createMany({
      data: [
        ...nonExistedBooks.map((x) => ({ id: x.id })),
        ...nonExistedVideos.map((x) => ({ id: x.id })),
      ],
    }),
    prisma.book.createMany({
      data: nonExistedBooks.map((x) => ({
        itemId: x.id,
        title: x.title,
        titleRuby: x.titleRuby,
        publishedAt: x.publishedAt,
      })),
    }),
    prisma.bookAuthoring.createMany({
      data: nonExistedBooks.flatMap((x) =>
        x.authors.map((author) => ({
          itemId: x.id,
          authorId: author.id,
        })),
      ),
    }),
    prisma.bookPublishing.createMany({
      data: nonExistedBooks.flatMap((x) =>
        x.publishers.map((publisher) => ({
          itemId: x.id,
          publisherId: publisher.id,
        })),
      ),
    }),
    prisma.video.createMany({
      data: nonExistedVideos.map((x) => ({
        itemId: x.id,
        title: x.title,
        titleRuby: x.titleRuby,
        publishedAt: x.publishedAt,
      })),
    }),
    prisma.videoCasting.createMany({
      data: nonExistedVideos.flatMap((x) =>
        x.casts.map((cast) => ({
          itemId: x.id,
          castId: cast.id,
        })),
      ),
    }),
  ]);
}

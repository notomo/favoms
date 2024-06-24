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
import { itemIdSchema } from "~/lib/schema/id";

const nameSchema = ({ min, max }: { min: number; max: number }) => {
  return pipe(string(), minLength(min), maxLength(max));
};

const bookAuthorSchema = object({
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const bookPublisherSchema = object({
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

  const items = isReplace
    ? []
    : await prisma.item.findMany({
        select: { id: true },
      });
  const itemRecord = listToRecord(items, "id");

  const bookAuthorRecord = listToRecord(bookAuthors, "name");
  const bookPublisherRecord = listToRecord(bookPublishers, "name");
  const castRecord = listToRecord(casts, "name");

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
                    id: castRecord[cast.name].id,
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

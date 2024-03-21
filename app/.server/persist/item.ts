import { ImportItem } from "~/lib/schema/item";
import { prisma, UpsertData, UpsertWhere } from "./prisma";

type Model = typeof prisma.item;

export async function getItem(id: number) {
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      book: {
        select: {
          title: true,
          authors: {
            select: {
              id: true,
              name: true,
            },
          },
          publishedAt: true,
        },
      },
    },
  });
  if (item === null) {
    return null;
  }
  return {
    id: item.id,
    name: item.book?.title || "",
    authors: item.book?.authors || [],
    publishedAt: item.book?.publishedAt?.toLocaleString(),
  };
}

export async function listItems({
  skip,
  take,
}: {
  skip: number;
  take: number;
}) {
  const items = await prisma.item.findMany({
    where: {},
    select: {
      id: true,
      book: {
        select: {
          title: true,
        },
      },
    },
    skip,
    take,
  });
  return items.map((e) => {
    return {
      id: e.id,
      name: e.book?.title || "",
    };
  });
}

const uniqueByKey = <T>(list: T[], key: keyof T): T[] => {
  return Array.from(
    new Map(
      list.map((e) => {
        return [e[key], e];
      }),
    ).values(),
  );
};

type RecordKey<T> = {
  [K in keyof T]: T[K] extends string | number | symbol ? K : never;
}[keyof T];

const toRecord = <
  T extends { [P in RecordKey<T>]: string | number | symbol },
  K extends RecordKey<T>,
>(
  list: T[],
  key: K,
): Record<T[K], T> => {
  return list.reduce(
    (acc, x) => ((acc[x[key]] = x), acc),
    {} as Record<T[K], T>,
  );
};

export async function importItems(items: ImportItem[], isReplace = false) {
  const uniqueBookAuthors = uniqueByKey(
    items.map((x) => x.authors).flat(),
    "name",
  );
  const uniqueBookPublishers = uniqueByKey(
    items.map((x) => x.publishers).flat(),
    "name",
  );

  const [bookAuthors, bookPublishers] = await prisma.$transaction(
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
      ]);
    },
  );

  const bookAuthorRecord = toRecord(bookAuthors, "name");
  const bookPublisherRecord = toRecord(bookPublishers, "name");

  await prisma.$transaction([
    ...(isReplace ? [prisma.item.deleteMany({ where: {} })] : []),
    ...items.map((x) => {
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
  ]);
}

export async function upsertBookItems(
  upserts: {
    where: UpsertWhere<Model>;
    data: Omit<UpsertData<typeof prisma.book>, "item">;
  }[],
) {
  return await prisma.$transaction(
    upserts.map((upsert) => {
      return prisma.item.upsert({
        where: upsert.where,
        create: {
          book: {
            create: upsert.data,
          },
        },
        update: {
          book: {
            update: upsert.data,
          },
        },
      });
    }),
  );
}

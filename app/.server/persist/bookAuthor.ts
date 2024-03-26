import { prisma } from "./prisma";

export async function listBookAuthors({
  query,
  skip,
  take,
}: {
  query: string;
  skip: number;
  take: number;
}) {
  const nameQuery = query
    ? {
        contains: query,
      }
    : undefined;

  return await prisma.bookAuthor.findMany({
    where: {
      name: nameQuery,
    },
    orderBy: { id: "asc" },
    select: {
      id: true,
      name: true,
      nameRuby: true,
    },
    skip,
    take,
  });
}

export async function getBookAuthor(bookAuthorId: number) {
  return await prisma.bookAuthor.findUnique({
    where: { id: bookAuthorId },
    select: {
      id: true,
      name: true,
      nameRuby: true,
      books: {
        select: {
          title: true,
          titleRuby: true,
          itemId: true,
        },
      },
    },
  });
}

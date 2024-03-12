import { prisma } from "./prisma";

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

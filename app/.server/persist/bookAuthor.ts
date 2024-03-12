import { prisma } from "./prisma";

export async function listBookAuthors() {
  return await prisma.bookAuthor.findMany({
    where: {},
    orderBy: { id: "asc" },
    select: {
      id: true,
      name: true,
      nameRuby: true,
    },
  });
}

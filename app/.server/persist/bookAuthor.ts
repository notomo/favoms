import { prisma } from "./prisma";

export async function listBookAuthors({
  skip,
  take,
}: {
  skip: number;
  take: number;
}) {
  return await prisma.bookAuthor.findMany({
    where: {},
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

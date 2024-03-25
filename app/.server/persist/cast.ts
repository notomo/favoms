import { prisma } from "./prisma";

export async function listCasts({
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

  return await prisma.cast.findMany({
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

export async function getCast(castId: number) {
  return await prisma.cast.findUnique({
    where: { id: castId },
    select: {
      id: true,
      name: true,
      nameRuby: true,
      videos: {
        select: {
          title: true,
          titleRuby: true,
          itemId: true,
        },
      },
    },
  });
}

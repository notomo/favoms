import { prisma, UpsertData, UpsertWhere } from "./prisma";

type Model = typeof prisma.item;

export async function getItem(id: number) {
  return await prisma.item.findUnique({
    where: {
      id: id,
    },
  });
}

export async function upsertItems(
  upserts: {
    where: UpsertWhere<Model>;
    data: UpsertData<Model>;
  }[]
) {
  return await prisma.$transaction(
    upserts.map((upsert) => {
      return prisma.item.upsert({
        where: upsert.where,
        create: upsert.data,
        update: upsert.data,
      });
    })
  );
}

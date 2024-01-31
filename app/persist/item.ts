import { prisma, UpsertData, UpsertWhere } from "./prisma";

type Model = typeof prisma.item;

export async function getItem(id: number) {
  return await prisma.item.findUnique({
    where: {
      id: id,
    },
  });
}

export async function upsertItem(
  where: UpsertWhere<Model>,
  data: UpsertData<Model>
) {
  return await prisma.item.upsert({
    where,
    create: data,
    update: data,
  });
}

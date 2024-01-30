import { prisma } from "./prisma";

export async function getItem(id: number) {
  return await prisma.item.findUnique({
    where: {
      id: id,
    },
  });
}

type UpsertArgs = Parameters<typeof prisma.item.upsert>[0];
type UpsertWhere = UpsertArgs["where"];
type UpsertData = UpsertArgs["update"] & UpsertArgs["create"];
export async function upsertItem(where: UpsertWhere, data: UpsertData) {
  return await prisma.item.upsert({
    where,
    create: data,
    update: data,
  });
}

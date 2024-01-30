import { prisma } from "./prisma";

export async function getMylist(id: number) {
  return await prisma.mylist.findUnique({
    where: {
      id: id,
    },
    include: {
      items: true,
    },
  });
}

export async function listMylists() {
  return await prisma.mylist.findMany({
    where: {},
  });
}

type UpsertArgs = Parameters<typeof prisma.mylist.upsert>[0];
type UpsertWhere = UpsertArgs["where"];
type UpsertData = UpsertArgs["update"] & UpsertArgs["create"];
export async function upsertMylist(where: UpsertWhere, data: UpsertData) {
  return await prisma.mylist.upsert({
    where,
    create: data,
    update: data,
  });
}

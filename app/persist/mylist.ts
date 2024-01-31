import { UpsertData, UpsertWhere, prisma } from "./prisma";

type Model = typeof prisma.mylist;

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

export async function upsertMylist(
  where: UpsertWhere<Model>,
  data: UpsertData<Model>
) {
  return await prisma.mylist.upsert({
    where,
    create: data,
    update: data,
  });
}

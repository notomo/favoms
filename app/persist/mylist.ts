import { Prisma, UpsertData, UpsertWhere, prisma } from "./prisma";

type Model = typeof prisma.mylist;

export async function getMylistWith(id: number, include: Prisma.MylistInclude) {
  return await prisma.mylist.findUnique({
    where: {
      id: id,
    },
    include: include,
  });
}

export async function listMylists() {
  return await prisma.mylist.findMany({
    where: {},
  });
}

export async function updateMylist(id: number, data: UpsertData<Model>) {
  return await prisma.mylist.update({
    where: { id: id },
    data,
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

export async function createMylist() {
  return await prisma.mylist.create({
    data: { name: "New" },
  });
}

export async function deleteMylist(id: number) {
  return await prisma.mylist.delete({
    where: { id: id },
  });
}

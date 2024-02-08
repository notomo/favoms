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
  const mylistOrders = await prisma.mylistOrder.findMany({
    where: {},
    orderBy: { position: "asc" },
    select: {
      mylist: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return mylistOrders.map((e) => e.mylist);
}

export async function updateMylist(id: number, data: UpsertData<Model>) {
  return await prisma.mylist.update({
    where: { id: id },
    data,
  });
}

export async function upsertMylist(
  where: UpsertWhere<Model>,
  data: Pick<UpsertData<Model>, "name" | "items">
) {
  return await prisma.$transaction(async (tx) => {
    const mylist = await tx.mylist.upsert({
      where,
      create: data,
      update: data,
      select: {
        id: true,
        name: true,
      },
    });
    await tx.mylistOrder.create({
      data: {
        mylist: {
          connect: mylist,
        },
      },
    });
    return mylist;
  });
}

export async function createMylist() {
  return await prisma.$transaction(async (tx) => {
    const mylist = await tx.mylist.create({
      data: {
        name: "New",
      },
      select: {
        id: true,
        name: true,
      },
    });
    await tx.mylistOrder.create({
      data: {
        mylist: {
          connect: mylist,
        },
      },
    });
    return mylist;
  });
}

export async function deleteMylist(id: number) {
  return await prisma.mylist.delete({
    where: { id: id },
  });
}

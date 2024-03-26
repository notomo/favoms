import { UpsertData, UpsertWhere, prisma } from "./prisma";
import { switchKind } from "./kind";

type Model = typeof prisma.mylist;

export async function getMylist(id: number) {
  return prisma.mylist
    .findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        items: {
          select: {
            id: true,
            book: {
              select: { title: true },
            },
            video: {
              select: { title: true },
            },
          },
        },
      },
    })
    .then((e) => {
      if (e === null) {
        return null;
      }
      return {
        id: e.id,
        name: e.name,
        items: e?.items.map((item) => {
          const content = switchKind(item.book, item.video);
          return {
            id: item.id,
            kind: content.kind,
            name: content.inner.title || "",
          };
        }),
      };
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
  data: Pick<UpsertData<Model>, "name" | "items">,
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

export async function createMylist(name: string) {
  return await prisma.$transaction(async (tx) => {
    const mylist = await tx.mylist.create({
      data: {
        name: name,
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

export async function removeItemsFromMylist(
  mylistId: number,
  itemIds: number[],
) {
  return await prisma.mylist.update({
    where: {
      id: mylistId,
    },
    data: {
      items: {
        disconnect: itemIds.map((id) => ({ id: id })),
      },
    },
  });
}

export async function reorderMylists(mylistIds: number[]) {
  await prisma.$transaction([
    prisma.mylistOrder.deleteMany({
      where: {},
    }),
    prisma.mylistOrder.createMany({
      data: mylistIds.map((id, i) => ({
        mylistId: id,
        position: i,
      })),
    }),
  ]);
}

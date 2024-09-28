import { type UpsertData, type UpsertWhere, prisma } from "~/lib/prisma";

async function main() {
  const bookItems = await upsertBookItems(
    Array.from({ length: 40 }, (_, i) => {
      const id = i + 1;
      return {
        where: { id: id.toString() },
        data: {
          title: `title${id}`,
          titleRuby: `titleRuby${id}`,
        },
      };
    }),
  );
  console.log({ items: bookItems });

  const itemsA = bookItems.slice(undefined, 8);
  const mylistA = await upsertMylist(
    { id: 1 },
    {
      name: "A",
      items: {
        connect: itemsA,
      },
    },
  );
  console.log({ mylistA });

  const itemsB = bookItems.slice(8);
  const mylistB = await upsertMylist(
    { id: 2 },
    {
      name: "B",
      items: {
        connect: itemsB,
      },
    },
  );
  console.log({ mylistB });

  const emptyMylist = await upsertMylist(
    { id: 3 },
    {
      name: "C",
    },
  );
  console.log({ emptyMylist });
}

await main();

export async function upsertMylist(
  where: UpsertWhere<typeof prisma.mylist>,
  data: Pick<UpsertData<typeof prisma.mylist>, "name" | "items">,
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
    await tx.mylistOrder.upsert({
      where: {
        mylistId: mylist.id,
      },
      create: {
        mylist: {
          connect: mylist,
        },
      },
      update: {
        mylist: {
          connect: mylist,
        },
      },
    });
    return mylist;
  });
}

export async function upsertBookItems(
  upserts: {
    where: UpsertWhere<typeof prisma.item> & { id: string };
    data: Omit<UpsertData<typeof prisma.book>, "item">;
  }[],
) {
  return await prisma.$transaction(
    upserts.map((upsert) => {
      return prisma.item.upsert({
        where: upsert.where,
        create: {
          id: upsert.where.id,
          book: {
            create: upsert.data,
          },
        },
        update: {
          book: {
            update: upsert.data,
          },
        },
      });
    }),
  );
}

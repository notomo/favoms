import { upsertItems } from "~/.server/persist/item";
import { upsertMylist } from "~/.server/persist/mylist";

async function main() {
  const items = await upsertItems(
    Array.from({ length: 40 }, (_, i) => {
      const id = i + 1;
      return {
        where: { id },
        data: { name: `name${id}` },
      };
    }),
  );
  console.log({ items });

  const itemsA = items.slice(undefined, 8);
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

  const itemsB = items.slice(8);
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

main();

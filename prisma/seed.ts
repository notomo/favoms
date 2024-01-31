import { upsertItems } from "~/persist/item";
import { upsertMylist } from "~/persist/mylist";

async function main() {
  const itemsA = await upsertItems([
    { where: { id: 1 }, data: { name: "A" } },
    { where: { id: 2 }, data: { name: "B" } },
    { where: { id: 3 }, data: { name: "C" } },
    { where: { id: 4 }, data: { name: "D" } },
    { where: { id: 5 }, data: { name: "E" } },
  ]);
  console.log({ itemsA });

  const mylistA = await upsertMylist(
    { id: 1 },
    {
      name: "A",
      items: {
        connect: itemsA,
      },
    }
  );
  console.log({ mylistA });

  const mylistB = await upsertMylist(
    { id: 2 },
    {
      name: "B",
      items: {
        connect: itemsA.slice(2, 4),
      },
    }
  );
  console.log({ mylistB });
}

main();

import { upsertItem } from "~/persist/item";
import { upsertMylist } from "~/persist/mylist";

async function main() {
  const itemA = await upsertItem({ id: 1 }, { name: "A" });
  console.log({ itemA });

  const mylistA = await upsertMylist(
    { id: 1 },
    {
      name: "A",
      items: {
        connect: {
          id: itemA.id,
        },
      },
    }
  );
  console.log({ mylistA });
}

main();

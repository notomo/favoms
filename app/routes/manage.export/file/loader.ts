import { createReadableStreamFromReadable } from "@remix-run/node";
import { Readable } from "node:stream";
import { prisma } from "~/lib/prisma";
import { switchKind } from "~/lib/schema/validation/kind";

export const loader = async () => {
  const mylists = await getMylists();
  const all = {
    mylists,
  };
  const file = createReadableStreamFromReadable(
    Readable.from(JSON.stringify(all)),
  );
  return new Response(file, {
    headers: {
      "Content-Disposition": 'attachment; filename="favoms.json"',
      "Content-Type": "application/json",
    },
  });
};

const getMylists = async () => {
  const mylistOrders = await prisma.mylistOrder.findMany({
    where: {},
    orderBy: { position: "asc" },
    select: {
      mylist: {
        select: {
          name: true,
          items: {
            select: {
              book: {
                select: {
                  title: true,
                },
              },
              video: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return mylistOrders.map((e) => {
    return {
      name: e.mylist.name,
      items: e.mylist.items.map((item) => {
        const content = switchKind(item.book, item.video);
        return {
          kind: content.kind,
          title: content.inner.title,
        };
      }),
    };
  });
};

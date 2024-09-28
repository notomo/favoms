import { type LoaderFunctionArgs, defer } from "@remix-run/node";
import { prisma } from "~/lib/prisma";
import { assertNotFound } from "~/lib/response";
import { switchKind } from "~/lib/schema/validation/kind";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = validateId(params["mylistId"]);
  const mylist = getMylist(mylistId).then((x) => {
    assertNotFound(x, "mylist is not found");
    return x;
  });
  return defer({
    mylist,
  });
};

export type Mylist = {
  id: number;
  name: string;
  items: MylistItem[];
};

export type MylistItem = {
  id: string;
  name: string;
};

export async function getMylist(id: number): Promise<Mylist | null> {
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

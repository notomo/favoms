import { LoaderFunctionArgs, json } from "@remix-run/node";
import { assertNotFound } from "~/lib/response";
import { validateStringId } from "~/lib/schema/validation/params";
import { prisma } from "~/lib/prisma";
import { switchKind } from "~/lib/schema/validation/kind";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const itemId = validateStringId(params.itemId);
  const item = await getItem(itemId);
  assertNotFound(item, "item is not found");
  return json(item);
};

export type BookAuthor = {
  id: string;
  name: string;
};

export type Book = {
  kind: "book";
  authors: BookAuthor[];

  id: string;
  name: string;
  publishedAt?: string;
};

export type Cast = {
  id: string;
  name: string;
};

export type Video = {
  kind: "video";
  casts: Cast[];

  id: string;
  name: string;
  publishedAt?: string;
};

export type Item = Book | Video;

export async function getItem(id: string): Promise<Item | null> {
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      book: {
        select: {
          title: true,
          authors: {
            select: {
              id: true,
              name: true,
            },
          },
          publishedAt: true,
        },
      },
      video: {
        select: {
          title: true,
          castings: {
            select: {
              cast: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          publishedAt: true,
        },
      },
    },
  });
  if (item === null) {
    return null;
  }

  const content = switchKind(item.book, item.video);
  const shared = {
    id: item.id,
    name: content.inner.title || "",
    publishedAt: content.inner.publishedAt?.toLocaleString(),
  };
  if (content.kind === "book") {
    return {
      ...shared,
      kind: "book",
      authors: content.inner.authors || [],
    } as const;
  }
  return {
    ...shared,
    kind: "video",
    casts: item.video?.castings.map((x) => x.cast) || [],
  } as const;
}

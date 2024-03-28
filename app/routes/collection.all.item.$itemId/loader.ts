import { LoaderFunctionArgs, json } from "@remix-run/node";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";
import { prisma } from "~/lib/prisma";
import { switchKind } from "~/lib/schema/validation/kind";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const itemId = validateId(params.itemId);
  const item = await getItem(itemId);
  assertNotFound(item, "item is not found");
  return json(item);
};

export type BookAuthor = {
  id: number;
  name: string;
};

export type Book = {
  kind: "book";
  authors: BookAuthor[];

  id: number;
  name: string;
  publishedAt?: string;
};

export type Cast = {
  id: number;
  name: string;
};

export type Video = {
  kind: "video";
  casts: Cast[];

  id: number;
  name: string;
  publishedAt?: string;
};

export type Item = Book | Video;

export async function getItem(id: number): Promise<Item | null> {
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
          casts: {
            select: {
              id: true,
              name: true,
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
    casts: item.video?.casts || [],
  } as const;
}

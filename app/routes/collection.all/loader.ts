import { defer, type LoaderFunctionArgs } from "@remix-run/node";
import { switchKind } from "~/lib/schema/validation/kind";
import { prisma } from "~/lib/prisma";
import { getPage, getQuery } from "~/routePath/listParam";

const pageSize = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listItems({ query, skip, take }).then((items) => {
    return {
      existsNextPage: items.length === take,
      items: items.slice(0, pageSize),
    };
  });
  return defer({
    page,
    query,
    fetched,
  });
};

export type Item = {
  id: string;
  name: string;
};

async function listItems({
  query,
  skip,
  take,
}: {
  query: string;
  skip: number;
  take: number;
}): Promise<Item[]> {
  const nameQuery = query
    ? {
        OR: [
          {
            book: {
              title: {
                contains: query,
              },
            },
          },
          {
            video: {
              title: {
                contains: query,
              },
            },
          },
        ],
      }
    : {};

  const items = await prisma.item.findMany({
    where: nameQuery,
    select: {
      id: true,
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
    skip,
    take,
  });
  return items.map((item) => {
    const content = switchKind(item.book, item.video);
    return {
      id: item.id,
      name: content.inner.title || "",
    };
  });
}

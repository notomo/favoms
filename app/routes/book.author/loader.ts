import { type LoaderFunctionArgs, defer } from "react-router";
import { prisma } from "~/lib/prisma";

import { getPage, getQuery } from "~/routePath/listParam";

const pageSize = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listBookAuthors({ query, skip, take }).then((items) => {
    return {
      existsNextPage: items.length === take,
      bookAuthors: items.slice(0, pageSize),
    };
  });
  return defer({
    fetched,
    page,
    query,
  });
};

export type BookAuthor = Readonly<{
  id: string;
  name: string;
}>;

export async function listBookAuthors({
  query,
  skip,
  take,
}: {
  query: string;
  skip: number;
  take: number;
}): Promise<BookAuthor[]> {
  const nameQuery = query
    ? {
        contains: query,
      }
    : undefined;

  return await prisma.bookAuthor.findMany({
    where: {
      name: nameQuery,
    },
    orderBy: { id: "asc" },
    select: {
      id: true,
      name: true,
      nameRuby: true,
    },
    skip,
    take,
  });
}

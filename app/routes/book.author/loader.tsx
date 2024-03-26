import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { listBookAuthors } from "~/.server/persist/bookAuthor";
import { getPage, getQuery } from "~/routePath";

const pageSize = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listBookAuthors({ query, skip, take }).then((items) => {
    return {
      existsNextPage: items.length == take,
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
  id: number;
  name: string;
}>;

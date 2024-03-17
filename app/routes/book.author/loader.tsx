import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { listBookAuthors } from "~/.server/persist/bookAuthor";
import { getPage } from "~/routePath";

const pageSize = 20;

export const getBookAuthors = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listBookAuthors({ skip, take }).then((items) => {
    return {
      existsNextPage: items.length == take,
      bookAuthors: items.slice(0, pageSize),
    };
  });
  return defer({
    fetched,
    page,
  });
};

export type BookAuthor = Readonly<{
  id: number;
  name: string;
}>;

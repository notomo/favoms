import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { listItems } from "~/.server/persist/item";
import { getPage, getQuery } from "~/routePath";

const pageSize = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listItems({ query, skip, take }).then((items) => {
    return {
      existsNextPage: items.length == take,
      items: items.slice(0, pageSize),
    };
  });
  return defer({
    page,
    query,
    fetched,
  });
};

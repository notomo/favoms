import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { listCasts } from "~/.server/persist/cast";
import { getPage, getQuery } from "~/routePath";

const pageSize = 20;

export const getCasts = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listCasts({ query, skip, take }).then((items) => {
    return {
      existsNextPage: items.length == take,
      casts: items.slice(0, pageSize),
    };
  });
  return defer({
    fetched,
    page,
    query,
  });
};

export type Cast = Readonly<{
  id: number;
  name: string;
}>;

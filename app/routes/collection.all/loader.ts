import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { listItems } from "~/.server/persist/item";
import { getPage } from "~/routePath";

const pageSize = 20;

export const getItems = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listItems({ skip, take }).then((items) => {
    return {
      hasNext: items.length == take,
      items: items.slice(0, pageSize),
    };
  });
  return defer({
    page,
    fetched,
  });
};

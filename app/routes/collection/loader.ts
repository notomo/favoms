import { LoaderFunctionArgs, defer, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { listMylists } from "~/.server/persist/mylist";
import { allItemsRoute, collectionRoute } from "~/route_path";

export const getMylists = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute) {
    return redirect(allItemsRoute);
  }

  const mylists = listMylists();

  return defer({
    mylists,
  });
};

export type LoaderData = ReturnType<typeof useLoaderData<typeof getMylists>>;
export type Mylist = Awaited<LoaderData["mylists"]>[number];

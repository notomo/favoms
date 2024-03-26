import { LoaderFunctionArgs, defer, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { listMylists } from "~/.server/persist/mylist";
import { allItemsRoute, collectionRoute } from "~/routePath";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute()) {
    return redirect(allItemsRoute());
  }

  const mylists = listMylists();

  return defer({
    mylists,
  });
};

type LoaderData = ReturnType<typeof useLoaderData<typeof loader>>;
export type Mylist = Awaited<LoaderData["mylists"]>[number];

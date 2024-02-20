import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { listMylists } from "~/persist/mylist";
import { allItemsRoute, collectionRoute } from "~/route_path";

export const getMylists = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute) {
    return redirect(allItemsRoute);
  }

  const mylists = await listMylists();
  return json({
    mylists,
  });
};

export type LoaderData = ReturnType<typeof useLoaderData<typeof getMylists>>;
export type Mylist = LoaderData["mylists"][number];

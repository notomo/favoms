import { Outlet, json, redirect, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listMylists } from "~/persist/mylist";
import { allItemsRoute, collectionRoute, mylistRoute } from "~/route_path";
import { CollectionLink } from "./collection_link";
import { LoaderFunctionArgs } from "@remix-run/node";
import { CollectionsDropDownMenu } from "./collections_dropdown_menu";
import { createMylistAction } from "~/routes/collection/create_mylist_dialog";

export const action = createMylistAction;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname === collectionRoute) {
    return redirect(allItemsRoute);
  }

  const mylists = await listMylists();
  return json({
    mylists,
  });
};

const Collections = () => {
  const { mylists } = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-end h-[40px]">
        <CollectionsDropDownMenu />
      </div>
      <ScrollArea className="border border-gray-600 h-[calc(100%-40px)]">
        <nav className="h-full">
          <ul className="flex flex-col h-full">
            <CollectionLink path={allItemsRoute}>All</CollectionLink>

            {mylists.map(({ id, name }) => {
              return (
                <CollectionLink path={mylistRoute(id)} key={id}>
                  {name}
                </CollectionLink>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex gap-4 w-full h-full p-4">
      <div className="w-2/12 h-full">
        <Collections />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

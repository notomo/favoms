import { Outlet, json, redirect, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listMylists } from "~/persist/mylist";
import { allItemsRoute, collectionRoute, mylistRoute } from "~/route_path";
import { CollectionLink } from "./collection_link";
import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { CollectionsDropDownMenu } from "./collections_dropdown_menu";
import { createMylistAction } from "~/routes/collection/create_mylist_dialog";

export const meta: MetaFunction = () => {
  return [{ title: "Collections | favoms" }];
};

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
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <CollectionsDropDownMenu className="justify-self-end" />

      <ScrollArea className="border border-gray-600">
        <nav className="h-full">
          <ul className="flex h-full flex-col">
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
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      <Collections />
      <Outlet />
    </div>
  );
}

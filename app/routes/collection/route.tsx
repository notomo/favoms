import { Outlet, json, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listMylists } from "~/persist/mylist";
import { allItemsRoute, mylistRoute } from "~/route_path";
import { CollectionLink, CollectionRow } from "./collection";

export const loader = async () => {
  const mylists = await listMylists();
  return json({
    mylists,
  });
};

const Collections = () => {
  const { mylists } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="border border-gray-600 h-full">
      <nav className="h-full">
        <ul className="flex flex-col h-full">
          <CollectionLink path={allItemsRoute}>
            <CollectionRow>All</CollectionRow>
          </CollectionLink>

          {mylists.map(({ id }) => {
            return (
              <CollectionLink path={mylistRoute(id)} key={id}>
                <CollectionRow>mylist {id}</CollectionRow>
              </CollectionLink>
            );
          })}
        </ul>
      </nav>
    </ScrollArea>
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

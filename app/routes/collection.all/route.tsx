import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { collectionItemRoute } from "~/route_path";
import { ItemRow, ItemLink } from "./item";

export const loader = async () => {
  const items = await listItems();
  return json({
    items,
  });
};

const ItemRows = () => {
  const { items } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="h-full border border-gray-600">
      <ul className="flex flex-col h-full">
        {items.map(({ id }) => {
          const path = collectionItemRoute(id);
          return (
            <ItemLink path={path} key={id}>
              <ItemRow itemId={id} />
            </ItemLink>
          );
        })}
      </ul>
    </ScrollArea>
  );
};

export default function Page() {
  return (
    <div className="flex gap-4 w-full h-full">
      <div className="w-4/12 h-full">
        <ItemRows />
      </div>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}

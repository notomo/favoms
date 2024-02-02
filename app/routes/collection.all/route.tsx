import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { collectionItemRoute } from "~/route_path";
import { Item, ItemNav } from "./item";

export const loader = async () => {
  const items = await listItems();
  return json({
    items,
  });
};

export default function Page() {
  const { items } = useLoaderData<typeof loader>();
  return (
    <div className="flex gap-4 w-full h-full">
      <ScrollArea className="w-4/12 h-full border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id }) => {
            const path = collectionItemRoute(id);
            return (
              <ItemNav path={path} key={id}>
                <Item itemId={id} />
              </ItemNav>
            );
          })}
        </ul>
      </ScrollArea>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}

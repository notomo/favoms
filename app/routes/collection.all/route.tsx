import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { collectionItemRoute } from "~/route_path";
import { ItemLink } from "./item_link";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";

export const loader = async () => {
  const items = await listItems();
  return json({
    items,
  });
};

const ItemRows = () => {
  const { items } = useLoaderData<typeof loader>();
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between h-[40px]">
        <div className="flex items-center px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100%-40px)] border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id, name }) => {
            const path = collectionItemRoute(id);
            return (
              <ItemLink path={path} key={id}>
                {name}
              </ItemLink>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
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

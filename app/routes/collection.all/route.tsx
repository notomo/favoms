import { type MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { collectionItemRoute } from "~/route_path";
import { ItemLink } from "./item_link";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export const loader = async () => {
  const items = await listItems();
  return json({
    items,
  });
};

const ItemRows = () => {
  const { items } = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full grid grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="border border-gray-600">
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
    <div className="w-full h-full grid grid-cols-2 grid-rows-[100%] gap-x-4">
      <ItemRows />
      <Outlet />
    </div>
  );
}

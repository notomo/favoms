import { type MetaFunction, defer } from "@remix-run/node";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { collectionItemRoute } from "~/route_path";
import { ItemLink } from "./item_link";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Suspense } from "react";
import { Loading } from "~/loading";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export const loader = async () => {
  const items = listItems();
  return defer({
    items,
  });
};

type Item = {
  id: number;
  name: string;
};

const ItemRows = ({ items }: { items: Item[] }) => {
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="border border-gray-600">
        <ul className="flex h-full flex-col">
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
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.items}>
          {(items) => <ItemRows items={items} />}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

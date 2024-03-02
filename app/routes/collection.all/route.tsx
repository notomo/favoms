import { type MetaFunction } from "@remix-run/node";
import {
  Await,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { collectionItemRoute, getPage } from "~/routePath";
import { ItemLink } from "./itemLink";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Suspense, useState } from "react";
import { Loading } from "~/component/ui/loading";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea";
import { getItems } from "./loader";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export const loader = getItems;

type Item = {
  id: number;
  name: string;
};

const ItemRows = ({
  allItems,
  items,
  setAllItems,
  hasNext,
  loadedPages,
  setLoadedPages,
}: {
  allItems: Item[];
  items: Item[];
  setAllItems: (items: Item[]) => void;
  hasNext: boolean;
  loadedPages: Record<number, boolean>;
  setLoadedPages: (loadedPages: Record<number, boolean>) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = getPage(searchParams);
  const currentItems = loadedPages[page] ? allItems : [...allItems, ...items];

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <InfiniteScrollArea
        // TODO: load on scroll up
        className="border"
        hasNext={hasNext}
        loadNext={() => {
          setAllItems(currentItems);
          setLoadedPages({
            ...loadedPages,
            [page]: true,
          });
          const nextPage = page + 1;
          setSearchParams({ page: nextPage.toString() });
        }}
      >
        <ul className="flex h-full flex-col">
          {currentItems.map(({ id, name }) => {
            const path = collectionItemRoute(id, page);
            return (
              <ItemLink path={path} key={id}>
                {name}
              </ItemLink>
            );
          })}
        </ul>
      </InfiniteScrollArea>
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loadedPages, setLoadedPages] = useState<Record<number, boolean>>({});

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.fetched}>
          {(fetched) => (
            <ItemRows
              allItems={allItems}
              setAllItems={setAllItems}
              items={fetched.items}
              hasNext={fetched.hasNext}
              loadedPages={loadedPages}
              setLoadedPages={setLoadedPages}
            />
          )}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

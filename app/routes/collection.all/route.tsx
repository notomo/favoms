import { type MetaFunction, defer, LoaderFunctionArgs } from "@remix-run/node";
import {
  Await,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { listItems } from "~/.server/persist/item";
import { collectionItemRoute, getPage } from "~/routePath";
import { ItemLink } from "./itemLink";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Suspense, useState } from "react";
import { Loading } from "~/component/ui/loading";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

const pageSize = 20;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = getPage(searchParams);

  const skip = pageSize * (page - 1);
  const take = pageSize + 1;
  const fetched = listItems({ skip, take: pageSize + 1 }).then((items) => {
    return {
      hasMorePage: items.length == take,
      items: items.slice(0, pageSize),
    };
  });
  return defer({
    fetched,
  });
};

type Item = {
  id: number;
  name: string;
};

const ItemRows = ({
  allItems,
  items,
  setItems,
  hasMorePage,
  loadedPages,
  setLoadedPages,
}: {
  allItems: Item[];
  items: Item[];
  setItems: (items: Item[]) => void;
  hasMorePage: boolean;
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
        hasMorePage={hasMorePage}
        className="border"
        page={page}
        setPage={(nextPage) => {
          setItems(currentItems);
          setLoadedPages({
            ...loadedPages,
            [page]: true,
          });
          setSearchParams({ page: nextPage.toString() });
        }}
      >
        <ul className="flex h-full flex-col">
          {currentItems.map(({ id, name }) => {
            // TODO: page parameter
            const path = collectionItemRoute(id);
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
  const [allItems, setItems] = useState<Item[]>([]);
  const [loadedPages, setLoadedPages] = useState<Record<number, boolean>>({});

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.fetched}>
          {(fetched) => (
            <ItemRows
              allItems={allItems}
              items={fetched.items}
              hasMorePage={fetched.hasMorePage}
              setItems={setItems}
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

import { type MetaFunction } from "@remix-run/node";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { collectionItemRoute } from "~/routePath";
import { ItemLink } from "./itemLink";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Suspense } from "react";
import { Loading } from "~/component/ui/loading";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
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
  addedItems,
  existsNextPage,
  page,
}: {
  addedItems: Item[];
  existsNextPage: boolean;
  page: number;
}) => {
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <InfiniteScrollArea
        className="border"
        page={page}
        pageKey="page"
        addedItems={addedItems}
        existsNextPage={existsNextPage}
        content={(currentItems) => {
          return (
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
          );
        }}
      />
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.fetched}>
          {(fetched) => (
            <ItemRows
              addedItems={fetched.items}
              existsNextPage={fetched.existsNextPage}
              page={loaderData.page}
            />
          )}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

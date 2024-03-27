import { type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ItemLinks } from "./rowLink";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
import { Item, loader } from "./loader";
import { LazyLoad } from "~/component/lazyLoad";
import { SearchForm } from "~/component/ui/searchForm";
import { TwoColumn } from "~/component/layout/twoColumn";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export { loader } from "./loader";

const ItemList = ({
  items,
  existsNextPage,
  page,
  query,
}: {
  items: Item[];
  existsNextPage: boolean;
  page: number;
  query: string;
}) => {
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_6%_86%]">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl">All</div>
        <Button disabled variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <SearchForm query={query} placeholder={"Search item name"} />

      <InfiniteScrollArea
        key={query}
        className="border"
        page={page}
        pageKey="page"
        addedItems={items}
        existsNextPage={existsNextPage}
        content={(currentItems) => {
          return <ItemLinks page={page} query={query} items={currentItems} />;
        }}
      />
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <TwoColumn>
      <LazyLoad resolve={loaderData.fetched}>
        {(fetched) => (
          <ItemList
            page={loaderData.page}
            query={loaderData.query}
            {...fetched}
          />
        )}
      </LazyLoad>

      <Outlet />
    </TwoColumn>
  );
}

import { Outlet, useLoaderData } from "react-router";
import { TwoColumn } from "~/component/layout/twoColumn";
import { LazyLoad } from "~/component/lazyLoad";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea";
import { SearchForm } from "~/component/ui/searchForm";
import type { Item, loader } from "./loader";
import { ItemLinks } from "./rowLink";

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
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_6%_86%] items-center">
      <div className="px-4 text-2xl">All</div>

      <SearchForm query={query} placeholder={"Search item name"} />

      <InfiniteScrollArea
        key={query}
        className="h-full w-full border"
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

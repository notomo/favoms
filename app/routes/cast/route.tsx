import { Outlet, useLoaderData } from "react-router";
import { LeftNavigationTwoColumn } from "~/component/layout/leftNavigationTwoColumn";
import { LazyLoad } from "~/component/lazyLoad";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea";
import { SearchForm } from "~/component/ui/searchForm";
import type { Cast, loader } from "./loader";
import { CastLinks } from "./rowLink";

export { loader } from "./loader";

const CastList = ({
  casts,
  existsNextPage,
  page,
  query,
}: {
  casts: Cast[];
  existsNextPage: boolean;
  page: number;
  query: string;
}) => {
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <SearchForm query={query} placeholder={"Search cast name"} />

      <InfiniteScrollArea
        key={query}
        className="border"
        page={page}
        pageKey="page"
        addedItems={casts}
        existsNextPage={existsNextPage}
        content={(casts) => {
          return <CastLinks casts={casts} page={page} query={query} />;
        }}
      />
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <LeftNavigationTwoColumn>
      <LazyLoad resolve={loaderData.fetched}>
        {(fetched) => (
          <CastList
            page={loaderData.page}
            query={loaderData.query}
            {...fetched}
          />
        )}
      </LazyLoad>

      <Outlet />
    </LeftNavigationTwoColumn>
  );
}

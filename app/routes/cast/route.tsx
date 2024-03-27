import { Outlet, useLoaderData } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Cast, loader } from "./loader";
import { CastLinks } from "./castLinks";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
import { LazyLoad } from "~/component/lazyLoad";
import { SearchForm } from "~/component/ui/searchForm";

export const meta: MetaFunction = () => {
  return [{ title: "Casts | favoms" }];
};

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
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[6%_94%] gap-y-1">
      <SearchForm query={query} placeholder={"Search cast name"} />

      <InfiniteScrollArea
        key={query}
        className="border"
        page={page}
        pageKey="page"
        addedItems={casts}
        existsNextPage={existsNextPage}
        content={(casts) => {
          return (
            <nav className="h-full">
              <ul className="flex h-full flex-col">
                <CastLinks casts={casts} page={page} query={query} />
              </ul>
            </nav>
          );
        }}
      />
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
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
    </div>
  );
}

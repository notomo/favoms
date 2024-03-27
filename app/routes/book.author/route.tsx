import { Outlet, useLoaderData } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { BookAuthor, loader } from "./loader";
import { BookAuthorLinks } from "./bookAuthorLinks";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
import { LazyLoad } from "~/component/lazyLoad";
import { SearchForm } from "~/component/ui/searchForm";
import { LeftNavigationTwoColumn } from "~/component/layout/leftNavigationTwoColumn";

export const meta: MetaFunction = () => {
  return [{ title: "Book Authors | favoms" }];
};

export { loader } from "./loader";

const BookAuthorList = ({
  bookAuthors,
  existsNextPage,
  page,
  query,
}: {
  bookAuthors: BookAuthor[];
  existsNextPage: boolean;
  page: number;
  query: string;
}) => {
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[6%_94%] gap-y-1">
      <SearchForm query={query} placeholder={"Search author name"} />

      <InfiniteScrollArea
        key={query}
        className="border"
        page={page}
        pageKey="page"
        addedItems={bookAuthors}
        existsNextPage={existsNextPage}
        content={(bookAuthors) => {
          return (
            <nav className="h-full">
              <ul className="flex h-full flex-col">
                <BookAuthorLinks
                  bookAuthors={bookAuthors}
                  page={page}
                  query={query}
                />
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
    <LeftNavigationTwoColumn>
      <LazyLoad resolve={loaderData.fetched}>
        {(fetched) => (
          <BookAuthorList
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

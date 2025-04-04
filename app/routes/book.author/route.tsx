import { Outlet, useLoaderData } from "react-router";
import { LeftNavigationTwoColumn } from "~/component/layout/leftNavigationTwoColumn";
import { LazyLoad } from "~/component/lazyLoad";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea";
import { SearchForm } from "~/component/ui/searchForm";
import type { BookAuthor, loader } from "./loader";
import { BookAuthorLinks } from "./rowLink";

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
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%]">
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
            <BookAuthorLinks
              bookAuthors={bookAuthors}
              page={page}
              query={query}
            />
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

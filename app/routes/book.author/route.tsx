import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import { Loading } from "~/component/ui/loading";
import { BookAuthor, getBookAuthors } from "./loader";
import { BookAuthorLinks } from "./bookAuthorLinks";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";

export const meta: MetaFunction = () => {
  return [{ title: "Book Authors | favoms" }];
};

export const loader = getBookAuthors;

const BookAuthorList = ({
  bookAuthors,
  existsNextPage,
  page,
}: {
  bookAuthors: BookAuthor[];
  existsNextPage: boolean;
  page: number;
}) => {
  return (
    <InfiniteScrollArea
      className="border"
      page={page}
      pageKey="page"
      addedItems={bookAuthors}
      existsNextPage={existsNextPage}
      content={(bookAuthors) => {
        return (
          <nav className="h-full">
            <ul className="flex h-full flex-col">
              <BookAuthorLinks bookAuthors={bookAuthors} page={page} />
            </ul>
          </nav>
        );
      }}
    />
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.fetched}>
          {(fetched) => (
            <BookAuthorList
              bookAuthors={fetched.bookAuthors}
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

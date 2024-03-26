import {
  Await,
  Form,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import { Loading, LoadingOr } from "~/component/ui/loading";
import { BookAuthor, loader } from "./loader";
import { BookAuthorLinks } from "./bookAuthorLinks";
import { InfiniteScrollArea } from "~/component/ui/infiniteScrollArea/infiniteScrollArea";
import { Input } from "~/component/ui/input";
import { Search } from "lucide-react";
import { Button } from "~/component/ui/button";

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
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[6%_94%] gap-y-1">
      <Form method="GET" className="flex items-center gap-2">
        <Input
          defaultValue={query}
          placeholder="Search author name"
          name="query"
        />
        <Button type="submit" size="icon" variant="ghost" disabled={isLoading}>
          <LoadingOr isLoading={isLoading}>
            <Search size={24} />
          </LoadingOr>
        </Button>
      </Form>
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
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.fetched}>
          {(fetched) => (
            <BookAuthorList
              bookAuthors={fetched.bookAuthors}
              existsNextPage={fetched.existsNextPage}
              page={loaderData.page}
              query={loaderData.query}
            />
          )}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

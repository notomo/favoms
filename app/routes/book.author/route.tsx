import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import { Loading } from "~/component/ui/loading";
import { BookAuthor, getBookAuthors } from "./loader";
import { ScrollArea } from "~/component/ui/scrollArea";
import { BookAuthorLinks } from "./bookAuthorLinks";

export const meta: MetaFunction = () => {
  return [{ title: "Book Authors | favoms" }];
};

export const loader = getBookAuthors;

const BookAuthorList = ({ bookAuthors }: { bookAuthors: BookAuthor[] }) => {
  return (
    <ScrollArea className="border">
      <nav className="h-full">
        <ul className="flex h-full flex-col">
          <BookAuthorLinks bookAuthors={bookAuthors} />
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.bookAuthors}>
          {(bookAuthors) => <BookAuthorList bookAuthors={bookAuthors} />}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

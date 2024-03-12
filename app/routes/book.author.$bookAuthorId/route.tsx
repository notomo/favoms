import { type MetaFunction } from "@remix-run/node";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect } from "react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { BookAuthor, getBookAuthorWithBooks } from "./loader";
import { ItemLinks } from "./bookItemLinks";
import { Loading } from "~/component/ui/loading";

export const meta: MetaFunction = ({ params }) => {
  const bookAuthorId = params.bookAuthorId || "(invalid)";
  return [{ title: `Book author ${bookAuthorId} | favoms` }];
};

export const loader = getBookAuthorWithBooks;

const BookAuthorBookList = ({ bookAuthor }: { bookAuthor: BookAuthor }) => {
  useEffect(() => {
    // HACK
    document.title = `${bookAuthor.name} | favoms`;
  }, [bookAuthor.name]);

  return (
    <ScrollArea className="border">
      <ul className="flex h-full flex-col">
        <ItemLinks books={bookAuthor.books} mylistId={bookAuthor.id} />
      </ul>
    </ScrollArea>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.bookAuthor}>
          {(bookAuthor) =>
            bookAuthor === null ? (
              <div>book author is not found</div>
            ) : (
              <BookAuthorBookList bookAuthor={bookAuthor} />
            )
          }
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

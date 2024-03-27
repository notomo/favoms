import { type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { BookAuthor, loader } from "./loader";
import { BookItemLinks } from "./rowLink";
import { getPage, getQuery } from "~/routePath";
import { LazyLoad } from "~/component/lazyLoad";
import { TwoColumn } from "~/component/layout/twoColumn";

export const meta: MetaFunction = ({ params }) => {
  const bookAuthorId = params.bookAuthorId || "(invalid)";
  return [{ title: `Book author ${bookAuthorId} | favoms` }];
};

export { loader } from "./loader";

const BookAuthorBookList = ({ bookAuthor }: { bookAuthor: BookAuthor }) => {
  useEffect(() => {
    // HACK
    document.title = `${bookAuthor.name} | favoms`;
  }, [bookAuthor.name]);

  const [searchParams] = useSearchParams();
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  return (
    <ScrollArea className="border">
      <BookItemLinks
        books={bookAuthor.books}
        bookAuthorId={bookAuthor.id}
        page={page}
        query={query}
      />
    </ScrollArea>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <TwoColumn>
      <LazyLoad resolve={loaderData.bookAuthor}>
        {(bookAuthor) => <BookAuthorBookList bookAuthor={bookAuthor} />}
      </LazyLoad>

      <Outlet />
    </TwoColumn>
  );
}

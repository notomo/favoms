import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { BookAuthor, loader } from "./loader";
import { BookItemLinks } from "./rowLink";
import { getPage, getQuery } from "~/routePath";
import { LazyLoad } from "~/component/lazyLoad";
import { TwoColumn } from "~/component/layout/twoColumn";
import { useForceTitle } from "~/lib/meta";

export { loader } from "./loader";

const BookAuthorBookList = ({ bookAuthor }: { bookAuthor: BookAuthor }) => {
  useForceTitle(`${bookAuthor.name} | favoms`);

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

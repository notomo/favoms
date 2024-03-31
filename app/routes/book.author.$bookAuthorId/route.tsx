import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { BookAuthor, loader } from "./loader";
import { BookAuthorsItemLinks } from "./rowLink";
import { LazyLoad } from "~/component/lazyLoad";
import { TwoColumn } from "~/component/layout/twoColumn";
import { useForceTitle } from "~/lib/meta";

export { loader } from "./loader";

const BookAuthorBookList = ({ bookAuthor }: { bookAuthor: BookAuthor }) => {
  useForceTitle(`${bookAuthor.name} | Author | favoms`);

  return (
    <ScrollArea className="border">
      <BookAuthorsItemLinks
        books={bookAuthor.books}
        bookAuthorId={bookAuthor.id}
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

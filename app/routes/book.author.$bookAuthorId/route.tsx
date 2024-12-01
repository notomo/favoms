import { Outlet, useLoaderData } from "react-router";
import { TwoColumn } from "~/component/layout/twoColumn";
import { LazyLoad } from "~/component/lazyLoad";
import { ScrollArea } from "~/component/ui/scrollArea";
import { useForceTitle } from "~/lib/meta";
import type { BookAuthor, loader } from "./loader";
import { BookAuthorsItemLinks } from "./rowLink";

export { loader } from "./loader";

const BookAuthorBookList = ({ bookAuthor }: { bookAuthor: BookAuthor }) => {
  useForceTitle(`${bookAuthor.name} | Author | favoms`);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] items-center">
      <div className="px-4 text-2xl">{bookAuthor.name}</div>

      <div className="h-full">
        <ScrollArea className="h-full border">
          <BookAuthorsItemLinks
            books={bookAuthor.books}
            bookAuthorId={bookAuthor.id}
          />
        </ScrollArea>
      </div>
    </div>
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

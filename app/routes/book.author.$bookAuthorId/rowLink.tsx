import { bookAuthorBookRoute, getPage, getQuery } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/rowLink";
import { Book } from "./loader";
import { useSearchParams } from "@remix-run/react";

export const BookAuthorsItemLinks = ({
  bookAuthorId,
  books,
}: {
  bookAuthorId: number;
  books: Book[];
}) => {
  const [searchParams] = useSearchParams();
  const page = getPage(searchParams);
  const query = getQuery(searchParams);

  return books.map(({ itemId, title }) => {
    const path = bookAuthorBookRoute(bookAuthorId, itemId, page, query);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};

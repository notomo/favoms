import { bookAuthorBookRoute } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/rowLink";
import { Book } from "./loader";

export const BookItemLinks = ({
  bookAuthorId,
  books,
  page,
  query,
}: {
  bookAuthorId: number;
  books: Book[];
  page: number;
  query: string;
}) => {
  return books.map(({ itemId, title }) => {
    const path = bookAuthorBookRoute(bookAuthorId, itemId, page, query);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};

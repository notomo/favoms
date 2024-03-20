import { bookAuthorBookRoute } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/itemLink";
import { Book } from "./loader";

export const BookItemLinks = ({
  mylistId,
  books,
  page,
  query,
}: {
  mylistId: number;
  books: Book[];
  page: number;
  query: string;
}) => {
  return books.map(({ itemId, title }) => {
    const path = bookAuthorBookRoute(mylistId, itemId, page, query);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};

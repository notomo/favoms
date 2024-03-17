import { bookAuthorBookRoute } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/itemLink";
import { Book } from "./loader";

export const BookItemLinks = ({
  mylistId,
  books,
  page,
}: {
  mylistId: number;
  books: Book[];
  page: number;
}) => {
  return books.map(({ itemId, title }) => {
    const path = bookAuthorBookRoute(mylistId, itemId, page);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};
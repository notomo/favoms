import { bookAuthorBookRoute } from "~/routePath";
import { ItemLink } from "~/routes/collection.all/itemLink";
import { Book } from "./loader";

export const BookItemLinks = ({
  mylistId,
  books,
}: {
  mylistId: number;
  books: Book[];
}) => {
  return books.map(({ itemId, title }) => {
    const path = bookAuthorBookRoute(mylistId, itemId);
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};

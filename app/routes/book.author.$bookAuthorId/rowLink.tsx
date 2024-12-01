import { useSearchParams } from "react-router";
import { bookAuthorRoute } from "~/routePath/bookAuthorRoute";
import { ItemLink } from "~/routes/collection.all/rowLink";
import type { Book } from "./loader";

export const BookAuthorsItemLinks = ({
  bookAuthorId,
  books,
}: {
  bookAuthorId: string;
  books: Book[];
}) => {
  const [searchParams] = useSearchParams();

  return books.map(({ itemId, title }) => {
    const path = bookAuthorRoute({
      pathParams: { bookAuthorId, itemId },
      searchParams,
    });
    return (
      <ItemLink path={path} key={itemId}>
        {title}
      </ItemLink>
    );
  });
};

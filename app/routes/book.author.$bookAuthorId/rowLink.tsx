import { getPage, getQuery } from "~/routePath/listParam";
import { ItemLink } from "~/routes/collection.all/rowLink";
import { Book } from "./loader";
import { useSearchParams } from "@remix-run/react";
import { bookAuthorRoute } from "~/routePath/bookAuthorRoute";

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
    const path = bookAuthorRoute({
      queryParams: { query, page },
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

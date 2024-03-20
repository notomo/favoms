import { bookAuthorRoute } from "~/routePath";
import { BookAuthorLink } from "./bookAuthorLink";
import { BookAuthor } from "./loader";

export const BookAuthorLinks = ({
  bookAuthors,
  page,
  query,
}: {
  bookAuthors: BookAuthor[];
  page: number;
  query: string;
}) => {
  return bookAuthors.map(({ id, name }) => {
    const path = bookAuthorRoute(id, page, query);
    return (
      <BookAuthorLink path={path} key={id}>
        {name}
      </BookAuthorLink>
    );
  });
};

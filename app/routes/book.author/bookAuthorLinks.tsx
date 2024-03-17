import { bookAuthorRoute } from "~/routePath";
import { BookAuthorLink } from "./bookAuthorLink";
import { BookAuthor } from "./loader";

export const BookAuthorLinks = ({
  bookAuthors,
  page,
}: {
  bookAuthors: BookAuthor[];
  page: number;
}) => {
  return bookAuthors.map(({ id, name }) => {
    const path = bookAuthorRoute(id, page);
    return (
      <BookAuthorLink path={path} key={id}>
        {name}
      </BookAuthorLink>
    );
  });
};

import { bookAuthorRoute } from "~/routePath";
import { BookAuthorLink } from "./bookAuthorLink";
import { BookAuthor } from "./loader";

export const BookAuthorLinks = ({
  bookAuthors,
}: {
  bookAuthors: BookAuthor[];
}) => {
  return bookAuthors.map(({ id, name }) => {
    const path = bookAuthorRoute(id);
    return (
      <BookAuthorLink path={path} key={id}>
        {name}
      </BookAuthorLink>
    );
  });
};

import { bookAuthorRoute } from "~/routePath";
import { CollectionLink } from "./bookAuthorLink";
import { BookAuthor } from "./loader";

export const BookAuthorLinks = ({
  bookAuthors,
}: {
  bookAuthors: BookAuthor[];
}) => {
  return bookAuthors.map(({ id, name }) => {
    const path = bookAuthorRoute(id);
    return (
      <CollectionLink path={path} key={id}>
        {name}
      </CollectionLink>
    );
  });
};

import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { getBookAuthor } from "~/.server/persist/bookAuthor";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const bookAuthorId = validateId(params.bookAuthorId);
  const bookAuthor = getBookAuthor(bookAuthorId).then((x) => {
    assertNotFound(x, "book author is not found");
    return x;
  });
  return defer({
    bookAuthor,
  });
};

export type BookAuthor = {
  id: number;
  name: string;
  books: Book[];
};

export type Book = {
  itemId: number;
  title: string;
};

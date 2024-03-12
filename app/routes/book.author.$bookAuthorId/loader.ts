import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBookAuthor } from "~/.server/persist/book";
import { validateId } from "~/lib/schema/validation/params";

export const getBookAuthorWithBooks = async ({
  params,
}: LoaderFunctionArgs) => {
  const bookAuthorId = validateId(params.bookAuthorId);
  const bookAuthor = getBookAuthor(bookAuthorId);
  return defer({
    bookAuthor,
  });
};

export type LoaderData = ReturnType<
  typeof useLoaderData<typeof getBookAuthorWithBooks>
>;

export type BookAuthor = {
  id: number;
  name: string;
  books: Book[];
};

export type Book = {
  itemId: number;
  title: string;
};

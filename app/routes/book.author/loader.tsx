import { defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { listBookAuthors } from "~/.server/persist/bookAuthor";

export const getBookAuthors = async () => {
  const bookAuthors = listBookAuthors();
  return defer({
    bookAuthors,
  });
};

export type LoaderData = ReturnType<
  typeof useLoaderData<typeof getBookAuthors>
>;
export type BookAuthor = Awaited<LoaderData["bookAuthors"]>[number];

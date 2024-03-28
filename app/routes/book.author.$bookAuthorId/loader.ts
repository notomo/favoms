import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { assertNotFound } from "~/lib/response";
import { prisma } from "~/lib/prisma";
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

export async function getBookAuthor(
  bookAuthorId: number,
): Promise<BookAuthor | null> {
  return await prisma.bookAuthor.findUnique({
    where: { id: bookAuthorId },
    select: {
      id: true,
      name: true,
      nameRuby: true,
      books: {
        select: {
          title: true,
          titleRuby: true,
          itemId: true,
        },
      },
    },
  });
}

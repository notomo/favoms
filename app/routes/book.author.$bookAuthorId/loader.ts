import { type LoaderFunctionArgs, defer } from "@remix-run/node";
import { assertNotFound } from "~/lib/response";
import { prisma } from "~/lib/prisma";
import { validateStringId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const bookAuthorId = validateStringId(params["bookAuthorId"]);
  const bookAuthor = getBookAuthor(bookAuthorId).then((x) => {
    assertNotFound(x, "book author is not found");
    return x;
  });
  return defer({
    bookAuthor,
  });
};

export type BookAuthor = {
  id: string;
  name: string;
  books: Book[];
};

export type Book = {
  itemId: string;
  title: string;
};

export async function getBookAuthor(
  bookAuthorId: string,
): Promise<BookAuthor | null> {
  const bookAuthor = await prisma.bookAuthor.findUnique({
    where: { id: bookAuthorId },
    select: {
      id: true,
      name: true,
      authorings: {
        select: {
          book: {
            select: {
              title: true,
              titleRuby: true,
              itemId: true,
            },
          },
        },
      },
    },
  });

  if (bookAuthor === null) {
    return null;
  }

  return {
    id: bookAuthor.id,
    name: bookAuthor.name,
    books: bookAuthor.authorings.map((x) => x.book),
  };
}

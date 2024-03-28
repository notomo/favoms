import { type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { bookAuthorRoute, castRoute, itemRoute } from "~/routePath";
import { loader, BookAuthor, Item } from "./loader";
import { assertNever } from "~/lib/assert";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name} | favoms` }];
};

export { loader } from "./loader";

const BookAuthorList = ({ bookAuthors }: { bookAuthors: BookAuthor[] }) => {
  return (
    <div className="flex gap-2">
      Authors:
      {bookAuthors.map((author) => {
        return (
          <Link to={bookAuthorRoute(author.id, 1, "")} key={author.id}>
            {author.name}
          </Link>
        );
      })}
    </div>
  );
};

const VideoCastList = ({ videoCasts }: { videoCasts: BookAuthor[] }) => {
  return (
    <div className="flex gap-2">
      Authors:
      {videoCasts.map((cast) => {
        return (
          <Link to={castRoute(cast.id, 1, "")} key={cast.id}>
            {cast.name}
          </Link>
        );
      })}
    </div>
  );
};

const KindSpecificContent = ({ item }: { item: Item }) => {
  if (item.kind === "book") {
    return <BookAuthorList bookAuthors={item.authors} />;
  }
  if (item.kind === "video") {
    return <VideoCastList videoCasts={item.casts} />;
  }
  assertNever(item);
};

export default function Page() {
  const item = useLoaderData<typeof loader>();

  return (
    <ScrollArea className="h-full w-full border">
      <div className="flex flex-col">
        <Link to={itemRoute(item.id)} target="_blank" rel="noreferrer">
          {item.name}
        </Link>
        <KindSpecificContent item={item} />
        <div>Published at: {item.publishedAt || ""}</div>
      </div>
    </ScrollArea>
  );
}

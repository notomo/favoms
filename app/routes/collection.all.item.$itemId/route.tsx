import type { MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { ScrollArea } from "~/component/ui/scrollArea";
import { assertNever } from "~/lib/assert";
import { bookAuthorRoute } from "~/routePath/bookAuthorRoute";
import { castRoute } from "~/routePath/castRoute";
import { itemRoute } from "~/routePath/itemRoute";
import type { BookAuthor, Cast, Item, loader } from "./loader";

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
          <Link
            to={bookAuthorRoute({
              pathParams: { bookAuthorId: author.id },
            })}
            key={author.id}
          >
            {author.name}
          </Link>
        );
      })}
    </div>
  );
};

const VideoCastList = ({ videoCasts }: { videoCasts: Cast[] }) => {
  return (
    <div className="flex gap-2">
      Authors:
      {videoCasts.map((cast) => {
        return (
          <Link
            to={castRoute({
              pathParams: { castId: cast.id },
            })}
            key={cast.id}
          >
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
        <Link
          to={itemRoute({ pathParams: { itemId: item.id } })}
          target="_blank"
          rel="noreferrer"
        >
          {item.name}
        </Link>
        <KindSpecificContent item={item} />
        <div>Published at: {item.publishedAt || ""}</div>
      </div>
    </ScrollArea>
  );
}

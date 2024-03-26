import { type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { bookAuthorRoute, castRoute, itemRoute } from "~/routePath";
import { loader } from "./loader";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name} | favoms` }];
};

export { loader } from "./loader";

export default function Page() {
  const item = useLoaderData<typeof loader>();

  const authorList =
    item.kind === "book" ? (
      <div className="flex gap-2">
        Authors:
        {item.authors.map((author) => {
          return (
            <Link to={bookAuthorRoute(author.id, 1, "")} key={author.id}>
              {author.name}
            </Link>
          );
        })}
      </div>
    ) : null;

  const castList =
    item.kind === "video" ? (
      <div className="flex gap-2">
        Casts:
        {item.casts.map((cast) => {
          return (
            <Link to={castRoute(cast.id, 1, "")} key={cast.id}>
              {cast.name}
            </Link>
          );
        })}
      </div>
    ) : null;

  return (
    <ScrollArea className="h-full w-full border">
      <div className="flex flex-col">
        <Link to={itemRoute(item.id)} target="_blank" rel="noreferrer">
          {item.name}
        </Link>
        {authorList}
        {castList}
        <div>Published at: {item.publishedAt || ""}</div>
      </div>
    </ScrollArea>
  );
}

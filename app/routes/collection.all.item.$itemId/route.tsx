import { LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { getItem } from "~/.server/persist/item";
import { bookAuthorRoute, castRoute, itemRoute } from "~/routePath";
import { validateId } from "~/lib/schema/validation/params";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name} | favoms` }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const itemId = validateId(params.itemId);
  const item = await getItem(itemId);
  if (item === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(item);
};

export default function Page() {
  const { id, name, authors, casts, publishedAt } =
    useLoaderData<typeof loader>();
  return (
    <ScrollArea className="h-full w-full border">
      <div className="flex flex-col">
        <Link to={itemRoute(id)} target="_blank" rel="noreferrer">
          item {id}: {name}
        </Link>
        <div className="flex gap-2">
          Authors:
          {authors.map((author) => {
            return (
              <Link to={bookAuthorRoute(author.id, 1, "")} key={author.id}>
                {author.name}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-2">
          Casts:
          {casts.map((cast) => {
            return (
              <Link to={castRoute(cast.id, 1, "")} key={cast.id}>
                {cast.name}
              </Link>
            );
          })}
        </div>
        <div>Published at: {publishedAt || ""}</div>
      </div>
    </ScrollArea>
  );
}

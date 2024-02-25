import { LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getItem } from "~/.server/persist/item";
import { itemRoute } from "~/route_path";
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
  const { id, name } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="h-full w-full border">
      <div>
        <Link to={itemRoute(id)} target="_blank" rel="noreferrer">
          item {id}: {name}
        </Link>
      </div>
    </ScrollArea>
  );
}

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getItem } from "~/persist/item";
import { itemRoute } from "~/route_path";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const itemId = +params.itemId!;
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
    <ScrollArea className="w-full h-full border border-gray-600">
      <div>
        <Link to={itemRoute(id)} target="_blank" rel="noreferrer">
          item {id}: {name}
        </Link>
      </div>
    </ScrollArea>
  );
}

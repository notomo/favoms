import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getItem } from "~/persist/item";

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
        item {id}: {name}
      </div>
    </ScrollArea>
  );
}

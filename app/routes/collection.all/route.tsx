import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { itemRoute } from "~/route_path";

export const loader = async () => {
  const items = await listItems();
  return json({
    items: items,
  });
};

const Item = ({ id }: { id: number }) => {
  return (
    <Link to={itemRoute(id)}>
      <li className="border-b p-4">item {id}</li>
    </Link>
  );
};

export default function Page() {
  const { items } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="w-full h-full border border-gray-600">
      <ul className="flex flex-col h-full">
        {items.map(({ id }) => {
          return <Item id={id} key={id} />;
        })}
      </ul>
    </ScrollArea>
  );
}

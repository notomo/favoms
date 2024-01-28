import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = +params.mylistId!;
  const items = Array.from({ length: 100 }, (_, i) => i).map((id) => {
    return {
      id: (mylistId + 1) * id,
    };
  });
  return json({
    id: params.mylistId,
    items,
  });
};

const Item = ({ id }: { id: number }) => {
  return (
    <Link to={`/item/${id}`}>
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

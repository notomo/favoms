import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listItems } from "~/persist/item";
import { collectionItemRoute } from "~/route_path";

export const loader = async () => {
  const items = await listItems();
  return json({
    items: items,
  });
};

const Item = ({ itemId }: { itemId: number }) => {
  const path = collectionItemRoute(itemId);
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-bold bg-stone-500 text-stone-50" : ""
      }
      to={path}
    >
      <Link to={path}>
        <li className="border-b p-4">item {itemId}</li>
      </Link>
    </NavLink>
  );
};

export default function Page() {
  const { items } = useLoaderData<typeof loader>();
  return (
    <div className="flex gap-4 w-full h-full">
      <ScrollArea className="w-4/12 h-full border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id }) => {
            return <Item itemId={id} key={id} />;
          })}
        </ul>
      </ScrollArea>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}

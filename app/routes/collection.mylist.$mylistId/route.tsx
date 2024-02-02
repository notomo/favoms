import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getMylistWith } from "~/persist/mylist";
import { mylistItemRoute } from "~/route_path";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = +params.mylistId!;
  const mylist = await getMylistWith(mylistId, { items: true });
  if (mylist === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(mylist);
};

const Item = ({ mylistId, itemId }: { mylistId: number; itemId: number }) => {
  const path = mylistItemRoute(mylistId, itemId);
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
  const { id: mylistId, items } = useLoaderData<typeof loader>();
  return (
    <div className="flex gap-4 w-full h-full">
      <ScrollArea className="h-full w-4/12 border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id }) => {
            return <Item mylistId={mylistId} itemId={id} key={id} />;
          })}
        </ul>
      </ScrollArea>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}

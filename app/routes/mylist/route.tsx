import { Link, NavLink, Outlet, json, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { listMylists } from "~/persist/mylist";
import { mylistRoute } from "~/route_path";

export const loader = async () => {
  const mylists = await listMylists();
  return json({
    mylists: mylists.map((mylist) => {
      return {
        id: mylist.id,
      };
    }),
  });
};

const Item = ({ id }: { id: number }) => {
  const path = mylistRoute(id);
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-bold bg-stone-500 text-stone-50" : ""
      }
      to={path}
    >
      <Link to={path}>
        <li className="border-b p-4">mylist {id}</li>
      </Link>
    </NavLink>
  );
};

const MylistNavigation = () => {
  const { mylists } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="border border-gray-600 min-w-72">
      <nav>
        <ul className="flex flex-col h-full">
          {mylists.map(({ id }) => {
            return <Item id={id} key={id} />;
          })}
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default function Page() {
  return (
    <div className="flex gap-4 w-full h-full p-4">
      <MylistNavigation />
      <Outlet />
    </div>
  );
}

import { Link, Outlet } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";

const Item = ({ id }: { id: number }) => {
  return (
    <Link to={`/mylist/${id}`}>
      <li className="border-b p-4">hogehoge{id}</li>
    </Link>
  );
};

const MylistNavigation = () => {
  return (
    <ScrollArea className="border border-gray-600 min-w-72">
      <nav>
        <ul className="flex flex-col h-full">
          {Array.from({ length: 100 }, (_, i) => i).map((id) => {
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

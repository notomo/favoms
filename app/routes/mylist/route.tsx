import { Link, Outlet } from "@remix-run/react";

const Item = ({ id }: { id: number }) => {
  return (
    <Link to={`/mylist/${id}`}>
      <li className="border-b p-4">hogehoge{id}</li>
    </Link>
  );
};

const MylistNavigation = () => {
  return (
    <nav>
      <ul className="flex flex-col h-full border min-w-40">
        <Item id={1} />
        <Item id={2} />
        <Item id={3} />
      </ul>
    </nav>
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

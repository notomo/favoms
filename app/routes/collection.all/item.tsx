import { Link, NavLink } from "@remix-run/react";

export const ItemNav = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-bold bg-stone-500 text-stone-50" : ""
      }
      to={path}
    >
      <Link to={path}>{children}</Link>
    </NavLink>
  );
};

export const Item = ({ itemId }: { itemId: number }) => {
  return <li className="border-b p-4">item {itemId}</li>;
};

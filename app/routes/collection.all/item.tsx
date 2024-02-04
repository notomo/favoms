import { NavLink } from "@remix-run/react";

export const ItemLink = ({
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
      {children}
    </NavLink>
  );
};

export const ItemRow = ({ itemId }: { itemId: number }) => {
  return <li className="border-b p-4">item {itemId}</li>;
};

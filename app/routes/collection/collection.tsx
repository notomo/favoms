import { Link, NavLink } from "@remix-run/react";

export const CollectionLink = ({
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

export const CollectionRow = ({ children }: React.PropsWithChildren) => {
  return <li className="border-b p-4">{children}</li>;
};

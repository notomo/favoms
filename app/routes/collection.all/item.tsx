import { NavLink } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const ItemLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  const scrollTarget = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollTarget.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "font-bold bg-stone-500 text-stone-50" : ""
      }
      to={path}
    >
      {({ isActive }) => {
        if (isActive) {
          return (
            <>
              <div ref={scrollTarget}></div>
              {children}
            </>
          );
        }
        return children;
      }}
    </NavLink>
  );
};

export const ItemRow = ({ children }: React.PropsWithChildren) => {
  return <li className="border-b p-4">{children}</li>;
};

import { NavLink } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const CollectionLink = ({
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
        isActive ? "bg-stone-500 font-bold text-stone-50" : ""
      }
      to={path}
    >
      {({ isActive }) => {
        const row = <CollectionRow>{children}</CollectionRow>;
        if (isActive) {
          return (
            <>
              <div ref={scrollTarget}></div>
              {row}
            </>
          );
        }
        return row;
      }}
    </NavLink>
  );
};

const CollectionRow = ({ children }: React.PropsWithChildren) => {
  return <li className="border-b p-4">{children}</li>;
};

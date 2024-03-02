import { NavLink } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/tailwind";

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
        isActive ? "bg-stone-500 font-bold text-stone-50" : ""
      }
      to={path}
    >
      {({ isActive }) => {
        const row = <ItemRow>{children}</ItemRow>;
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

export const ItemRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cn("border-b p-4", className)}>{children}</li>;
};

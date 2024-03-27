import { NavLink } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const NavigationLink = ({
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
        isActive ? "bg-stone-500 text-stone-50" : ""
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

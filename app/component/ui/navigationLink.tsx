import { useEffect, useRef } from "react";
import { NavLink } from "react-router";

export const NavigationLink = ({
  children,
  path,
  end,
}: React.PropsWithChildren<{ path: string; end?: boolean }>) => {
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
      end={end}
    >
      {({ isActive }) => {
        if (isActive) {
          return (
            <>
              <div ref={scrollTarget} />
              {children}
            </>
          );
        }
        return children;
      }}
    </NavLink>
  );
};

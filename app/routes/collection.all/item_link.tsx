import { NavLink } from "@remix-run/react";
import { Trash, Undo } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "~/component/ui/button";
import { cn } from "~/lib/util";

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

const ItemRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cn("border-b p-4", className)}>{children}</li>;
};

export const EditableItemRow = ({
  children,
  willBeRemoved,
  onClickToRemove,
  onClickToUndo,
}: React.PropsWithChildren<{
  willBeRemoved: boolean;
  onClickToRemove: () => void;
  onClickToUndo: () => void;
}>) => {
  const onClick = willBeRemoved ? onClickToUndo : onClickToRemove;
  return (
    <ItemRow className="flex gap-2 items-center justify-between">
      {children}
      <Button onClick={onClick} variant="ghost" className="h-4 w-4 p-0">
        {willBeRemoved ? (
          <Undo className="h-4 w-4" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </ItemRow>
  );
};

import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const ItemLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavigationLink path={path}>
      <ItemRow>{children}</ItemRow>
    </NavigationLink>
  );
};

export const ItemRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cn("border-b p-4", className)}>{children}</li>;
};

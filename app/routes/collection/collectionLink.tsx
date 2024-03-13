import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const CollectionLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavigationLink path={path}>
      <CollectionRow>{children}</CollectionRow>
    </NavigationLink>
  );
};

export const CollectionRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cn("border-b p-4", className)}>{children}</li>;
};

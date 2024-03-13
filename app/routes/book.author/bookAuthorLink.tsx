import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const BookAuthorLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavigationLink path={path}>
      <BookAuthorRow>{children}</BookAuthorRow>
    </NavigationLink>
  );
};

export const BookAuthorRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cn("border-b p-4", className)}>{children}</li>;
};

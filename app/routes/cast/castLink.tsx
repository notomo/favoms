import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const CastLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavigationLink path={path}>
      <CastRow>{children}</CastRow>
    </NavigationLink>
  );
};

export const CastRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return <li className={cn("border-b p-4", className)}>{children}</li>;
};

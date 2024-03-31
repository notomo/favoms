import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const HistoryLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavigationLink path={path}>
      <HistoryRow>{children}</HistoryRow>
    </NavigationLink>
  );
};

export const HistoryRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("border-b bg-inherit p-4", className)}>{children}</div>
  );
};

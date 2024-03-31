import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const HistoryLink = ({
  children,
  className,
  path,
  end,
}: React.PropsWithChildren<{
  path: string;
  className?: string;
  end?: boolean;
}>) => {
  return (
    <NavigationLink end={end} path={path}>
      <HistoryRow className={className}>{children}</HistoryRow>
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

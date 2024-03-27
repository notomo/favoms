import { castRoute } from "~/routePath";
import { Cast } from "./loader";
import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const CastLinks = ({
  casts,
  page,
  query,
}: {
  casts: Cast[];
  page: number;
  query: string;
}) => {
  return casts.map(({ id, name }) => {
    const path = castRoute(id, page, query);
    return (
      <CastLink path={path} key={id}>
        {name}
      </CastLink>
    );
  });
};

const CastLink = ({
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
  return (
    <div className={cn("border-b bg-inherit p-4", className)}>{children}</div>
  );
};

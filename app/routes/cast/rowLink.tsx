import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";
import { castRoute } from "~/routePath/castRoute";
import type { Cast } from "./loader";

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
    const path = castRoute({
      queryParams: { page, query },
      pathParams: { castId: id },
    });
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

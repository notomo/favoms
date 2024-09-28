import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";
import type { Item } from "./loader";
import { collectionRoute } from "~/routePath/collectionRoute";

export const ItemLinks = ({
  items,
  page,
  query,
}: {
  items: Item[];
  page: number;
  query: string;
}) => {
  return items.map(({ id, name }) => {
    const path = collectionRoute({
      pathParams: { itemId: id },
      queryParams: { query, page },
    });
    return (
      <ItemLink path={path} key={id}>
        {name}
      </ItemLink>
    );
  });
};

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
  return (
    <div className={cn("border-b bg-inherit p-4", className)}>{children}</div>
  );
};

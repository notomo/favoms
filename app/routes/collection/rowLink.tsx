import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";
import { collectionRoute } from "~/routePath/collectionRoute";
import { mylistRoute } from "~/routePath/mylistRoute";
import type { Mylist } from "./loader";

export const AllItemsLink = () => {
  return <CollectionLink path={collectionRoute({})}>All</CollectionLink>;
};

export const MylistLinks = ({ mylists }: { mylists: Mylist[] }) => {
  return mylists.map(({ id, name }) => {
    const path = mylistRoute({ pathParams: { mylistId: id } });
    return (
      <CollectionLink path={path} key={id}>
        {name}
      </CollectionLink>
    );
  });
};

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
  return (
    <div className={cn("border-b bg-inherit p-4", className)}>{children}</div>
  );
};

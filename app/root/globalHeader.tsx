import { Link } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/component/ui/navigationMenu";
import { cn } from "~/lib/tailwind";
import { collectionRoute } from "~/routePath/collectionRoute";
import { castRoute } from "~/routePath/castRoute";
import { bookAuthorRoute } from "~/routePath/bookAuthorRoute";
import { importRoute } from "~/routePath/importRoute";

const MenuLink = ({
  to,
  children,
}: React.PropsWithChildren<{ to: string }>) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link to={to} className={navigationMenuTriggerStyle()}>
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export const GlobalHeader = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu className={cn("w-full", className)}>
      <NavigationMenuList>
        <MenuLink to={"/"}>Home</MenuLink>

        <MenuLink to={collectionRoute({})}>Collection</MenuLink>

        <MenuLink to={bookAuthorRoute({})}>Book Author</MenuLink>

        <MenuLink to={castRoute({})}>Cast</MenuLink>

        <MenuLink to={importRoute({})}>Import</MenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

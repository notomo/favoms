import { Link } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/component/ui/navigationMenu";
import {
  allItemsRoute,
  bookAuthorListRoute,
  castListRoute,
  homeRoute,
  importRoute,
} from "~/routePath";
import { cn } from "~/lib/tailwind";

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
        <MenuLink to={homeRoute()}>Home</MenuLink>

        <MenuLink to={allItemsRoute()}>Collection</MenuLink>

        <MenuLink to={bookAuthorListRoute()}>Book Author</MenuLink>

        <MenuLink to={castListRoute()}>Cast</MenuLink>

        <MenuLink to={importRoute()}>Import</MenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

import { NavLink } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/component/ui/navigationMenu";
import { cn } from "~/lib/tailwind";
import { collectionRoute } from "~/routePath/collectionRoute";
import { castRoute } from "~/routePath/castRoute";
import { bookAuthorRoute } from "~/routePath/bookAuthorRoute";
import { importRoute } from "~/routePath/importRoute";
import { cva } from "class-variance-authority";

const nav = cva("px-4 py-2 text-sm font-medium rounded-md");

const MenuLink = ({
  to,
  children,
}: React.PropsWithChildren<{ to: string }>) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive ? cn(nav(), "bg-accent") : nav()
          }
        >
          {children}
        </NavLink>
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

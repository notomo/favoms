import { Link } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/component/ui/navigation-menu";
import { allItemsRoute, homeRoute, importRoute } from "./route_path";
import { cn } from "~/lib/util";

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
        <MenuLink to={homeRoute}>Home</MenuLink>

        <MenuLink to={allItemsRoute}>Collection</MenuLink>

        <MenuLink to={importRoute}>Import</MenuLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

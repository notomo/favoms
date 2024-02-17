import { Link } from "@remix-run/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/component/ui/navigation-menu";
import { allItemsRoute, homeRoute } from "./route_path";
import { cn } from "~/lib/util";

export const GlobalHeader = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu className={cn("w-full", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to={homeRoute} className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to={allItemsRoute} className={navigationMenuTriggerStyle()}>
              Collection
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

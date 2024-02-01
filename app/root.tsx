import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/component/ui/navigation-menu";
import { collectionRoute, homeRoute } from "./route_path";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const Header = () => {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to={homeRoute}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={collectionRoute}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Collection
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default function App() {
  return (
    <html lang="en" className="dark flex w-full h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col w-full h-full">
        <div className="h-[40px]">
          <Header />
        </div>
        <div className="h-[calc(100%-40px)]">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en" className="dark w-full h-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex w-full h-screen">
        <div className="h-[40px]">
          <Header />
        </div>
        <h1 className="text-4xl flex w-full flex-col items-center justify-center h-[calc(100%-40px)]">
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </h1>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { GlobalHeader } from "./global_header";
export { ErrorBoundary } from "./error_boundary";

import stylesheet from "~/tailwind.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function Root() {
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
          <GlobalHeader />
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

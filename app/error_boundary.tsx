import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { GlobalHeader } from "./global_header";

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
          <GlobalHeader />
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

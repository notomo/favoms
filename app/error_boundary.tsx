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
    <html lang="en" className="dark h-full w-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen w-full">
        <div className="h-[40px]">
          <GlobalHeader />
        </div>
        <h1 className="flex h-[calc(100%-40px)] w-full flex-col items-center justify-center text-4xl">
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

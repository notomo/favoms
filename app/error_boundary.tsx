import {
  Links,
  Meta,
  Scripts,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { GlobalHeader } from "./global_header";

const ErrorMessage = () => {
  const error = useRouteError();
  return (
    <h1 className="flex flex-col items-center justify-center text-4xl">
      {isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : error instanceof Error
          ? error.message
          : "Unknown Error"}
    </h1>
  );
};

export function ErrorBoundary() {
  return (
    <html lang="en" className="dark h-full w-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full w-full">
        <div className="grid h-full w-full grid-cols-[100%] grid-rows-[5%_95%]">
          <GlobalHeader />
          <ErrorMessage />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

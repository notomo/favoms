import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
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
}

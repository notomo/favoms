import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import { GlobalHeader } from "./globalHeader";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark flex h-full w-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full w-full">
        <div className="grid h-full w-full grid-cols-[100%] grid-rows-[5%_95%]">
          <GlobalHeader />
          {children}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

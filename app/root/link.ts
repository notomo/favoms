import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

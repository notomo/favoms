import type { LinksFunction } from "react-router";
import stylesheet from "~/tailwind.css?url";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

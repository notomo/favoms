export { links } from "./root/link";

export { ErrorBoundary } from "./root/errorBoundary";

export { Layout } from "./root/layout";

import { Outlet } from "react-router";
export default function Root() {
  return <Outlet />;
}

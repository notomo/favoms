import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { collectionRoute } from "~/routePath/collectionRoute";

export const meta: MetaFunction = () => {
  return [{ title: "favoms" }];
};

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-3xl font-bold">
      <Link to={collectionRoute({})}>favoms</Link>
    </div>
  );
}

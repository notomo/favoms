import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { allItemsRoute } from "~/route_path";

export const meta: MetaFunction = () => {
  return [{ title: "favoms" }];
};

export default function Index() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-3xl font-bold">
      <Link to={allItemsRoute}>favoms</Link>
    </div>
  );
}

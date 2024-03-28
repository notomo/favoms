import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export default function Page() {
  return <div className="h-full w-full border"></div>;
}

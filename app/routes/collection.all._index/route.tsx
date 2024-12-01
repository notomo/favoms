import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "All | favoms" }];
};

export default function Page() {
  return <div className="h-full w-full border" />;
}

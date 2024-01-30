import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "favoms" },
    { name: "description", content: "Welcome to favoms!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-3xl font-bold">
      <Link to="mylist">Mylist</Link>
    </div>
  );
}

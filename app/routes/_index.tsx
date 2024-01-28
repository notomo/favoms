import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="text-3xl font-bold underline">
      <ul>
        <li>
          <Link to="mylist">Mylist</Link>
        </li>
      </ul>
    </div>
  );
}

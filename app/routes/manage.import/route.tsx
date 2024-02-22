import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Import | favoms" }];
};

export default function Index() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-3xl font-bold">
      TODO
    </div>
  );
}

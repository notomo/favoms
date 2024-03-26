import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { loader } from "./loader";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name} | favoms` }];
};

export { loader } from "./loader";

export default function Page() {
  const { id, name } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="h-full w-full border">
      <div>
        item {id}: {name}
      </div>
    </ScrollArea>
  );
}

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({
    id: params.itemId,
  });
};

export default function Page() {
  const { id } = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="w-full h-full border border-gray-600">
      <div>item {id}</div>
    </ScrollArea>
  );
}

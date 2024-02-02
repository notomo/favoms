import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getMylistWith } from "~/persist/mylist";
import { mylistItemRoute } from "~/route_path";
import { Item, ItemNav } from "~/routes/collection.all/item";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mylistId = +params.mylistId!;
  const mylist = await getMylistWith(mylistId, { items: true });
  if (mylist === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(mylist);
};

export default function Page() {
  const { id: mylistId, items } = useLoaderData<typeof loader>();
  return (
    <div className="flex gap-4 w-full h-full">
      <ScrollArea className="h-full w-4/12 border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id }) => {
            const path = mylistItemRoute(mylistId, id);
            return (
              <ItemNav path={path} key={id}>
                <Item itemId={id} />
              </ItemNav>
            );
          })}
        </ul>
      </ScrollArea>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}

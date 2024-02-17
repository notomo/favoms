import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getMylistWith } from "~/persist/mylist";
import { mylistItemRoute } from "~/route_path";
import { ItemLink } from "~/routes/collection.all/item_link";
import { MylistDropDownMenu } from "~/routes/collection.mylist.$mylistId/mylist_dropdown_menu";

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

const MylistItemRows = () => {
  const {
    id: mylistId,
    name: mylistName,
    items,
  } = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full grid grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="px-4 text-xl overflow-hidden whitespace-nowrap overflow-ellipsis">
          {mylistName}
        </div>
        <MylistDropDownMenu mylistName={mylistName} />
      </div>

      <ScrollArea className="border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id, name }) => {
            const path = mylistItemRoute(mylistId, id);
            return (
              <ItemLink path={path} key={id}>
                {name}
              </ItemLink>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-[100%] gap-x-4">
      <MylistItemRows />
      <Outlet />
    </div>
  );
}

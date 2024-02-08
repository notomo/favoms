import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getMylistWith } from "~/persist/mylist";
import { mylistItemRoute } from "~/route_path";
import { ItemRow, ItemLink } from "~/routes/collection.all/item";
import { DeleteMylistButton } from "./delete_mylist_button";
import { EditableMylistName } from "./editable_mylist_name";

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
  const { id: mylistId, name, items } = useLoaderData<typeof loader>();

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between h-[40px]">
        <EditableMylistName mylistId={mylistId} name={name} />
        <DeleteMylistButton disabled={false} />
      </div>
      <ScrollArea className="h-[calc(100%-40px)] border border-gray-600">
        <ul className="flex flex-col h-full">
          {items.map(({ id, name }) => {
            const path = mylistItemRoute(mylistId, id);
            return (
              <ItemLink path={path} key={id}>
                <ItemRow>{name}</ItemRow>
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
    <div className="flex gap-4 w-full h-full">
      <div className="w-4/12">
        <MylistItemRows />
      </div>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  );
}

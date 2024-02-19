import { type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { isMylistItemsEditRoute } from "~/route_path";
import { MylistDropDownMenu } from "./mylist_dropdown_menu";
import {
  DoneMylistItemsEditButton,
  EditableItemRows,
} from "./mylist_items_edit";
import { LoaderData, getMylistWithItems } from "./loader";
import { ItemLinks } from "./mylist_item_links";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.mylistName} | favoms` }];
};

export const loader = getMylistWithItems;

const MylistItemRows = ({
  mylistId,
  mylistName,
  items,
}: {
  mylistId: LoaderData["mylistId"];
  mylistName: LoaderData["mylistName"];
  items: LoaderData["items"];
}) => {
  const [willBeRemovedItemIds, setWillBeRemovedItemIds] = useState<
    Record<number, boolean>
  >({});

  const [searchParams] = useSearchParams();
  const editable = isMylistItemsEditRoute(searchParams);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="truncate px-4 text-xl">{mylistName}</div>
        {editable ? (
          <DoneMylistItemsEditButton
            willBeRemovedItemIds={willBeRemovedItemIds}
          />
        ) : (
          <MylistDropDownMenu mylistId={mylistId} mylistName={mylistName} />
        )}
      </div>

      <ScrollArea className="border border-gray-600">
        <ul className="flex h-full flex-col">
          {editable ? (
            <EditableItemRows
              willBeRemovedItemIds={willBeRemovedItemIds}
              items={items}
              setWillBeRemovedItemIds={setWillBeRemovedItemIds}
            />
          ) : (
            <ItemLinks items={items} mylistId={mylistId} />
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <MylistItemRows key={loaderData.mylistId} {...loaderData} />
      <Outlet />
    </div>
  );
}

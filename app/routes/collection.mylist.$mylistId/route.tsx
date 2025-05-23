import { useState } from "react";
import { Outlet, useLoaderData, useSearchParams } from "react-router";
import { TwoColumn } from "~/component/layout/twoColumn";
import { LazyLoad } from "~/component/lazyLoad";
import { ScrollArea } from "~/component/ui/scrollArea";
import { useForceTitle } from "~/lib/meta";
import {
  getMylistDialogType,
  isMylistItemsEditRoute,
} from "~/routePath/mylistRoute";
import { MylistDropDownMenu } from "./dropdownMenu";
import {
  DoneMylistItemsEditButton,
  EditableItemList,
} from "./editItems/editableList";
import type { Mylist, loader } from "./loader";
import { ItemLinks } from "./rowLink";

export { loader } from "./loader";

const MylistItemList = ({ mylist }: { mylist: Mylist }) => {
  useForceTitle(`${mylist.name} | Mylist | favoms`);

  const [willBeRemovedItemIds, setWillBeRemovedItemIds] = useState<
    Record<number, boolean>
  >({});

  const [searchParams] = useSearchParams();
  const editable = isMylistItemsEditRoute(searchParams);
  const dialogType = getMylistDialogType(searchParams);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="truncate px-4 text-2xl">{mylist.name}</div>
        {editable ? (
          <DoneMylistItemsEditButton
            willBeRemovedItemIds={willBeRemovedItemIds}
          />
        ) : (
          <MylistDropDownMenu
            key={dialogType}
            mylistId={mylist.id}
            mylistName={mylist.name}
            dialogType={dialogType}
          />
        )}
      </div>

      <ScrollArea className="border">
        {editable ? (
          <EditableItemList
            willBeRemovedItemIds={willBeRemovedItemIds}
            items={mylist.items}
            setWillBeRemovedItemIds={setWillBeRemovedItemIds}
          />
        ) : (
          <ItemLinks items={mylist.items} mylistId={mylist.id} />
        )}
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <TwoColumn>
      <LazyLoad resolve={loaderData.mylist}>
        {(mylist) => <MylistItemList mylist={mylist} />}
      </LazyLoad>

      <Outlet />
    </TwoColumn>
  );
}

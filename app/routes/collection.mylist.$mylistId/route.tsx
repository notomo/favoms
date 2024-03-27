import { type MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { getMylistDialogType, isMylistItemsEditRoute } from "~/routePath";
import { MylistDropDownMenu } from "./mylistDropdownMenu";
import { DoneMylistItemsEditButton, EditableItemList } from "./mylistItemsEdit";
import { Mylist, loader } from "./loader";
import { ItemLinks } from "./rowLink";
import { LazyLoad } from "~/component/lazyLoad";
import { TwoColumn } from "~/component/layout/twoColumn";

export const meta: MetaFunction = ({ params }) => {
  const mylistId = params.mylistId || "(invalid)";
  return [{ title: `Mylist ${mylistId} | favoms` }];
};

export { loader } from "./loader";

const MylistItemList = ({ mylist }: { mylist: Mylist }) => {
  useEffect(() => {
    // HACK
    document.title = `${mylist.name} | favoms`;
  }, [mylist.id, mylist.name]);

  const [willBeRemovedItemIds, setWillBeRemovedItemIds] = useState<
    Record<number, boolean>
  >({});

  const [searchParams] = useSearchParams();
  const editable = isMylistItemsEditRoute(searchParams);
  const dialogType = getMylistDialogType(searchParams);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="truncate px-4 text-xl">{mylist.name}</div>
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

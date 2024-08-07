import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { MylistLinks, AllItemsLink } from "./rowLink";
import { type MetaFunction } from "@remix-run/node";
import { CollectionsDropDownMenu } from "./dropdownMenu";
import {
  DoneMylistsEditButton,
  EditableMylistList,
} from "./reorderMylist/editableList";
import { Mylist, type loader } from "./loader";
import { useState } from "react";
import { createMylistAction } from "./createMylist/action";
import { LazyLoad } from "~/component/lazyLoad";
import { LeftNavigationTwoColumn } from "~/component/layout/leftNavigationTwoColumn";
import {
  getCollectionDialogType,
  isMylistsEditRoute,
} from "~/routePath/collectionRoute";

export const meta: MetaFunction = () => {
  return [{ title: "Collection | favoms" }];
};

export const action = createMylistAction;

export { loader } from "./loader";

const CollectionList = ({ mylists }: { mylists: Mylist[] }) => {
  const [searchParams] = useSearchParams();
  const dialogType = getCollectionDialogType(searchParams);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <CollectionsDropDownMenu
        key={dialogType}
        dialogType={dialogType}
        className="self-center justify-self-end"
      />

      <ScrollArea className="border">
        <AllItemsLink />

        <MylistLinks mylists={mylists} />
      </ScrollArea>
    </div>
  );
};

const EditableCollectionList = ({ mylists }: { mylists: Mylist[] }) => {
  const [mylistIds, setMylistIds] = useState(mylists.map((x) => x.id));

  const mylistRecords: Record<number, Mylist> = {};
  mylists.forEach((mylist) => {
    mylistRecords[mylist.id] = mylist;
  });

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <DoneMylistsEditButton
        mylistIds={mylistIds}
        className="self-center justify-self-end"
      />

      <ScrollArea className="border">
        <AllItemsLink />

        <EditableMylistList
          mylistRecords={mylistRecords}
          mylistIds={mylistIds}
          setMylistIds={setMylistIds}
        />
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  const [searchParams] = useSearchParams();
  const editable = isMylistsEditRoute(searchParams);

  const loaderData = useLoaderData<typeof loader>();

  return (
    <LeftNavigationTwoColumn>
      <LazyLoad resolve={loaderData.mylists}>
        {(mylists) =>
          editable ? (
            <EditableCollectionList mylists={mylists} />
          ) : (
            <CollectionList mylists={mylists} />
          )
        }
      </LazyLoad>

      <Outlet />
    </LeftNavigationTwoColumn>
  );
}

import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Outlet, useLoaderData, useSearchParams } from "react-router";
import { LeftNavigationTwoColumn } from "~/component/layout/leftNavigationTwoColumn";
import { LazyLoad } from "~/component/lazyLoad";
import { ScrollArea } from "~/component/ui/scrollArea";
import {
  getCollectionDialogType,
  isMylistsEditRoute,
} from "~/routePath/collectionRoute";
import { createMylistAction } from "./createMylist/action";
import { CollectionsDropDownMenu } from "./dropdownMenu";
import type { Mylist, loader } from "./loader";
import {
  DoneMylistsEditButton,
  EditableMylistList,
} from "./reorderMylist/editableList";
import { AllItemsLink, MylistLinks } from "./rowLink";

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
  for (const mylist of mylists) {
    mylistRecords[mylist.id] = mylist;
  }

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

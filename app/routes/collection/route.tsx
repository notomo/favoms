import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scrollArea";
import {
  allItemsRoute,
  getCollectionDialogType,
  isMylistsEditRoute,
} from "~/routePath";
import { CollectionLink } from "./collectionLink";
import { type MetaFunction } from "@remix-run/node";
import { CollectionsDropDownMenu } from "./collectionsDropdownMenu";
import {
  DoneMylistsEditButton,
  EditableMylistRows,
} from "~/routes/collection/mylistsEdit";
import { Mylist, loader } from "./loader";
import { MylistLinks } from "~/routes/collection/mylistLinks";
import { useState } from "react";
import { createMylistAction } from "~/routes/collection/createMylistAction";
import { LazyLoad } from "~/component/lazyLoad";
import { LeftNavigationTwoColumn } from "~/component/layout/leftNavigationTwoColumn";

export const meta: MetaFunction = () => {
  return [{ title: "Collections | favoms" }];
};

export const action = createMylistAction;

export { loader } from "./loader";

const AllItemsCollectionLink = () => {
  return <CollectionLink path={allItemsRoute()}>All</CollectionLink>;
};

const Collections = ({ mylists }: { mylists: Mylist[] }) => {
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
        <ul className="flex h-full flex-col">
          <AllItemsCollectionLink />

          <MylistLinks mylists={mylists} />
        </ul>
      </ScrollArea>
    </div>
  );
};

const EditableCollections = ({ mylists }: { mylists: Mylist[] }) => {
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
        <ul className="flex h-full flex-col">
          <AllItemsCollectionLink />

          <EditableMylistRows
            mylistRecords={mylistRecords}
            mylistIds={mylistIds}
            setMylistIds={setMylistIds}
          />
        </ul>
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
            <EditableCollections mylists={mylists} />
          ) : (
            <Collections mylists={mylists} />
          )
        }
      </LazyLoad>

      <Outlet />
    </LeftNavigationTwoColumn>
  );
}

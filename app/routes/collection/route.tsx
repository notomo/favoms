import {
  Await,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { ScrollArea } from "~/component/ui/scroll-area";
import { allItemsRoute, isMylistsEditRoute } from "~/route_path";
import { CollectionLink } from "./collection_link";
import { type MetaFunction } from "@remix-run/node";
import { CollectionsDropDownMenu } from "./collections_dropdown_menu";
import { createMylistAction } from "~/routes/collection/create_mylist_dialog";
import {
  DoneMylistsEditButton,
  EditableMylistRows,
} from "~/routes/collection/mylists_edit";
import { Mylist, getMylists } from "./loader";
import { MylistLinks } from "~/routes/collection/mylist_links";
import { Suspense, useState } from "react";
import { Loading } from "~/component/ui/loading";

export const meta: MetaFunction = () => {
  return [{ title: "Collections | favoms" }];
};

export const action = createMylistAction;

export const loader = getMylists;

const AllItemsCollectionLink = () => {
  return <CollectionLink path={allItemsRoute}>All</CollectionLink>;
};

const Collections = ({ mylists }: { mylists: Mylist[] }) => {
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <CollectionsDropDownMenu className="self-center justify-self-end" />

      <ScrollArea className="border border-gray-600">
        <nav className="h-full">
          <ul className="flex h-full flex-col">
            <AllItemsCollectionLink />

            <MylistLinks mylists={mylists} />
          </ul>
        </nav>
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

      <ScrollArea className="border border-gray-600">
        <nav className="h-full">
          <ul className="flex h-full flex-col">
            <AllItemsCollectionLink />

            <EditableMylistRows
              mylistRecords={mylistRecords}
              mylistIds={mylistIds}
              setMylistIds={setMylistIds}
            />
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default function Page() {
  const [searchParams] = useSearchParams();
  const editable = isMylistsEditRoute(searchParams);

  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.mylists}>
          {(mylists) =>
            editable ? (
              <EditableCollections mylists={mylists} />
            ) : (
              <Collections mylists={mylists} />
            )
          }
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

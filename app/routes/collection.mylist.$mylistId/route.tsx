import { type MetaFunction } from "@remix-run/node";
import {
  Await,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { ScrollArea } from "~/component/ui/scrollArea";
import { getMylistDialogType, isMylistItemsEditRoute } from "~/routePath";
import { MylistDropDownMenu } from "./mylistDropdownMenu";
import { DoneMylistItemsEditButton, EditableItemRows } from "./mylistItemsEdit";
import { MylistItem, loader } from "./loader";
import { ItemLinks } from "./mylistItemLinks";
import { Loading } from "~/component/ui/loading";

export const meta: MetaFunction = ({ params }) => {
  const mylistId = params.mylistId || "(invalid)";
  return [{ title: `Mylist ${mylistId} | favoms` }];
};

export { loader } from "./loader";

const MylistItemRows = ({
  mylistId,
  mylistName,
  items,
}: {
  mylistId: number;
  mylistName: string;
  items: MylistItem[];
}) => {
  useEffect(() => {
    // HACK
    document.title = `${mylistName} | favoms`;
  }, [mylistId, mylistName]);

  const [willBeRemovedItemIds, setWillBeRemovedItemIds] = useState<
    Record<number, boolean>
  >({});

  const [searchParams] = useSearchParams();
  const editable = isMylistItemsEditRoute(searchParams);
  const dialogType = getMylistDialogType(searchParams);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="truncate px-4 text-xl">{mylistName}</div>
        {editable ? (
          <DoneMylistItemsEditButton
            willBeRemovedItemIds={willBeRemovedItemIds}
          />
        ) : (
          <MylistDropDownMenu
            key={dialogType}
            mylistId={mylistId}
            mylistName={mylistName}
            dialogType={dialogType}
          />
        )}
      </div>

      <ScrollArea className="border">
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
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.mylist}>
          {(mylist) =>
            mylist === null ? (
              <div>mylist is not found</div>
            ) : (
              <MylistItemRows
                mylistId={mylist.id}
                mylistName={mylist.name}
                items={mylist.items}
              />
            )
          }
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}

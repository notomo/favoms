import { LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "~/component/ui/button";
import { ScrollArea } from "~/component/ui/scroll-area";
import { getMylistWith } from "~/persist/mylist";
import { isMylistItemsEditRoute, mylistItemRoute } from "~/route_path";
import { EditableItemRow, ItemLink } from "~/routes/collection.all/item_link";
import { MylistDropDownMenu } from "~/routes/collection.mylist.$mylistId/mylist_dropdown_menu";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.name} | favoms` }];
};

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

const DoneMylistItemsEditButton = ({
  willBeRemovedItemIds,
}: {
  willBeRemovedItemIds: Record<number, boolean>;
}) => {
  const fetcher = useFetcher();

  const onSubmit = (e: FormEvent) => {
    const data = {
      itemIds: Object.entries(willBeRemovedItemIds)
        .filter(([, willBeRemoved]) => willBeRemoved)
        .map(([id]) => id)
        .join(","),
    };
    fetcher.submit(data, { method: "POST", action: "done_items_edit" });
    e.preventDefault();
  };

  return (
    <fetcher.Form onSubmit={onSubmit}>
      <Button type="submit" variant="default" size="icon">
        <Check className="h-4 w-4" />
      </Button>
    </fetcher.Form>
  );
};

type LoaderData = ReturnType<typeof useLoaderData<typeof loader>>;

const MylistItemRows = ({
  mylistId,
  mylistName,
  items,
}: {
  mylistId: LoaderData["id"];
  mylistName: LoaderData["name"];
  items: LoaderData["items"];
}) => {
  const [willBeRemovedItemIds, setWillBeDeletedItemIds] = useState<
    Record<number, boolean>
  >({});

  const [searchParams] = useSearchParams();
  const editable = isMylistItemsEditRoute(searchParams);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[8%_92%] gap-y-1">
      <div className="flex items-center justify-between">
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap px-4 text-xl">
          {mylistName}
        </div>
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
          {items.map(({ id, name }) => {
            if (editable) {
              return (
                <EditableItemRow
                  key={id}
                  willBeRemoved={willBeRemovedItemIds[id]}
                  onClickToRemove={() => {
                    setWillBeDeletedItemIds({
                      ...willBeRemovedItemIds,
                      [id]: true,
                    });
                  }}
                  onClickToUndo={() => {
                    setWillBeDeletedItemIds({
                      ...willBeRemovedItemIds,
                      [id]: false,
                    });
                  }}
                >
                  {name}
                </EditableItemRow>
              );
            }

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
  const {
    id: mylistId,
    name: mylistName,
    items,
  } = useLoaderData<typeof loader>();

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      <MylistItemRows
        key={mylistId}
        mylistId={mylistId}
        mylistName={mylistName}
        items={items}
      />
      <Outlet />
    </div>
  );
}

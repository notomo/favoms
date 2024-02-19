import { useFetcher } from "@remix-run/react";
import { Check, Trash, Undo } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "~/component/ui/button";
import { ItemRow } from "~/routes/collection.all/item_link";
import { LoaderData } from "~/routes/collection.mylist.$mylistId/loader";

export const DoneMylistItemsEditButton = ({
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

export const EditableItemRow = ({
  children,
  willBeRemoved,
  onClickToRemove,
  onClickToUndo,
}: React.PropsWithChildren<{
  willBeRemoved: boolean;
  onClickToRemove: () => void;
  onClickToUndo: () => void;
}>) => {
  const onClick = willBeRemoved ? onClickToUndo : onClickToRemove;
  return (
    <ItemRow className="flex items-center justify-between gap-2">
      {children}
      <Button onClick={onClick} variant="ghost" className="h-4 w-4 p-0">
        {willBeRemoved ? (
          <Undo className="h-4 w-4" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </ItemRow>
  );
};

export const EditableItemRows = ({
  items,
  willBeRemovedItemIds,
  setWillBeRemovedItemIds,
}: {
  items: LoaderData["items"];
  willBeRemovedItemIds: Record<number, boolean>;
  setWillBeRemovedItemIds: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
}) => {
  return items.map(({ id, name }) => {
    const remove = () => {
      setWillBeRemovedItemIds({
        ...willBeRemovedItemIds,
        [id]: true,
      });
    };

    const undo = () => {
      setWillBeRemovedItemIds({
        ...willBeRemovedItemIds,
        [id]: false,
      });
    };

    return (
      <EditableItemRow
        key={id}
        willBeRemoved={willBeRemovedItemIds[id]}
        onClickToRemove={remove}
        onClickToUndo={undo}
      >
        {name}
      </EditableItemRow>
    );
  });
};

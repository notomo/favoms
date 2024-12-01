import { useFetcher, useParams, useSearchParams } from "react-router";
import { Check, Trash, Undo } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "~/component/ui/button";
import { LoadingOr } from "~/component/ui/loading";
import { ItemRow } from "~/routes/collection.all/rowLink";
import type { MylistItem } from "~/routes/collection.mylist.$mylistId/loader";
import type { InputSchema } from "./schema";

export const DoneMylistItemsEditButton = ({
  willBeRemovedItemIds,
}: {
  willBeRemovedItemIds: Record<number, boolean>;
}) => {
  const fetcher = useFetcher();
  const searchParams = useSearchParams();
  const rawPathParams = useParams();

  const onSubmit = (e: FormEvent) => {
    const data: InputSchema = {
      itemIds: Object.entries(willBeRemovedItemIds)
        .filter(([, willBeRemoved]) => willBeRemoved)
        .map(([id]) => id)
        .join(","),
      itemId: rawPathParams["itemId"] || "",
      searchParams: searchParams.toString(),
    };
    fetcher.submit(data, { method: "POST", action: "editItems" });
    e.preventDefault();
  };

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form onSubmit={onSubmit}>
      <Button
        type="submit"
        variant="default"
        size="icon"
        disabled={isSubmitting}
      >
        <LoadingOr isLoading={isSubmitting}>
          <Check className="h-4 w-4" />
        </LoadingOr>
      </Button>
    </fetcher.Form>
  );
};

const EditableItemRow = ({
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

export const EditableItemList = ({
  items,
  willBeRemovedItemIds,
  setWillBeRemovedItemIds,
}: {
  items: MylistItem[];
  willBeRemovedItemIds: Record<string, boolean>;
  setWillBeRemovedItemIds: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
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
        willBeRemoved={willBeRemovedItemIds[id] !== undefined}
        onClickToRemove={remove}
        onClickToUndo={undo}
      >
        {name}
      </EditableItemRow>
    );
  });
};

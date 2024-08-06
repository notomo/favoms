import { useFetcher, useParams, useSearchParams } from "@remix-run/react";
import { Check, GripVertical } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "~/component/ui/button";
import { type Mylist } from "../loader";
import { CollectionRow } from "~/routes/collection/rowLink";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { LoadingOr } from "~/component/ui/loading";
import { InputSchema } from "./schema";

export const DoneMylistsEditButton = ({
  mylistIds,
  className,
}: {
  mylistIds: number[];
  className?: string;
}) => {
  const fetcher = useFetcher();
  const rawPathParams = useParams();
  const searchParams = useSearchParams();

  const onSubmit = (e: FormEvent) => {
    const data: InputSchema = {
      mylistIds: mylistIds.join(","),
      itemId: rawPathParams["itemId"] || "",
      searchParams: searchParams.toString(),
    };
    fetcher.submit(data, { method: "POST", action: "reorderMylist" });
    e.preventDefault();
  };

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form onSubmit={onSubmit} className={className}>
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

const EditableMylistRow = ({
  id,
  children,
}: React.PropsWithChildren<{ id: number }>) => {
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  return (
    <div
      ref={setNodeRef}
      className={clsx("", {
        ["z-10"]: isDragging,
      })}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <CollectionRow className="flex items-center gap-2">
        <i
          ref={setActivatorNodeRef}
          className="mdi mdi-drag"
          style={{
            cursor: isDragging ? "grabbing" : "grap",
          }}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </i>
        {children}
      </CollectionRow>
    </div>
  );
};

export const EditableMylistList = ({
  mylistRecords,
  mylistIds,
  setMylistIds,
}: {
  mylistRecords: Record<number, Mylist>;
  mylistIds: number[];
  setMylistIds: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const mylists = mylistIds
    .map((id) => mylistRecords[id])
    .filter((x) => x !== undefined);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over === null || active.id === over.id) {
          return;
        }
        const oldIndex = mylistIds.findIndex((id) => id === active.id);
        const newIndex = mylistIds.findIndex((id) => id === over.id);
        const newMylistIds = arrayMove(mylistIds, oldIndex, newIndex);
        setMylistIds(newMylistIds);
      }}
      autoScroll={{
        threshold: { x: 0, y: 0.2 },
      }}
    >
      <SortableContext items={mylists} strategy={verticalListSortingStrategy}>
        {mylists.map(({ id, name }) => {
          return (
            <EditableMylistRow key={id} id={id}>
              {name}
            </EditableMylistRow>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

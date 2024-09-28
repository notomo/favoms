import { type InferInput, object, pipe, string, transform } from "valibot";
import { joinedItemIdsSchema, optionalItemIdSchema } from "~/lib/schema/id";
import { removeMylistParam } from "~/routePath/mylistRoute";

export const editMylistItemsSchema = object({
  itemIds: joinedItemIdsSchema,
  itemId: optionalItemIdSchema,
  searchParams: pipe(
    string(),
    transform((x) => {
      return removeMylistParam(x, "edit");
    }),
  ),
});

export type InputSchema = Required<
  Record<keyof InferInput<typeof editMylistItemsSchema>, string>
>;

import { InferInput, object, pipe, string, transform } from "valibot";
import { joinedIdsSchema, optionalIdSchema } from "~/lib/schema/id";
import { removeMylistParam } from "~/routePath/mylistRoute";

export const editMylistItemsSchema = object({
  itemIds: joinedIdsSchema,
  itemId: optionalIdSchema,
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

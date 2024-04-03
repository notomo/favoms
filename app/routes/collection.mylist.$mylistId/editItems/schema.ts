import { object, string, transform } from "valibot";
import { joinedIdsSchema, optionalIdSchema } from "~/lib/schema/id";
import { removeMylistParam } from "~/routePath/mylistRoute";

export const editMylistItemsSchema = object({
  itemIds: joinedIdsSchema,
  itemId: optionalIdSchema,
  searchParams: transform(string(), (x) => {
    return removeMylistParam(x, "edit");
  }),
});

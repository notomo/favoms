import { object } from "valibot";
import { joinedIdsSchema } from "~/lib/schema/id";

export const editMylistItemsSchema = object({
  itemIds: joinedIdsSchema,
});

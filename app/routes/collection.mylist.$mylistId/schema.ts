import { object } from "valibot";
import { joinedIdsSchema } from "~/lib/schema/id";
import { mylistNameSchema } from "~/lib/schema/mylist";

export const editMylistInfoSchema = object({
  name: mylistNameSchema,
});

export const editMylistItemsSchema = object({
  itemIds: joinedIdsSchema,
});

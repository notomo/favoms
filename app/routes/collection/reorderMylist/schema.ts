import { object } from "valibot";
import { joinedIdsSchema } from "~/lib/schema/id";

export const editMylistsSchema = object({
  mylistIds: joinedIdsSchema,
});

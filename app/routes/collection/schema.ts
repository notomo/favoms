import { object } from "valibot";
import { joinedIdsSchema } from "~/lib/schema/id";
import { mylistNameSchema } from "~/lib/schema/mylist";

export const createMylistSchema = object({
  name: mylistNameSchema,
});

export const editMylistsSchema = object({
  mylistIds: joinedIdsSchema,
});

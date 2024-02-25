import { object } from "valibot";
import { mylistNameSchema } from "~/lib/schema/mylist";

export const createMylistSchema = object({
  name: mylistNameSchema,
});

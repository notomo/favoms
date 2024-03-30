import { object } from "valibot";
import { mylistNameSchema } from "~/lib/schema/mylist";

export const editMylistInfoSchema = object({
  name: mylistNameSchema,
});

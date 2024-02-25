import { maxLength, minLength, object, string } from "valibot";
import { idSchema } from "~/lib/schema/id";

export const mylistNameSchema = string([minLength(1), maxLength(100)]);

export const mylistSchema = object({
  name: mylistNameSchema,
  id: idSchema,
});

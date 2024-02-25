import { maxLength, minLength, object, string } from "valibot";
import { idSchema } from "~/lib/schema/id";

export const itemNameSchema = string([minLength(1), maxLength(1000)]);

export const itemSchema = object({
  name: itemNameSchema,
  id: idSchema,
});

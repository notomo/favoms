import { minLength, object, string } from "valibot";
import { idSchema } from "~/lib/schema/id";

export const itemSchema = object({
  name: string([minLength(1)]),
  id: idSchema,
});

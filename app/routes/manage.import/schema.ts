import { object, instance, mimeType, array } from "valibot";
import { itemImportSchema } from "~/lib/schema/item";
import { checkboxSchema } from "~/lib/schema/ui";

export const schema = object({
  targetFile: instance(File, [mimeType(["application/json"])]),
  dryRun: checkboxSchema,
  isReplace: checkboxSchema,
});

export const fileSchema = object({
  items: array(itemImportSchema),
});

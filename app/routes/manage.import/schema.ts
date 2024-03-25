import { object, instance, mimeType } from "valibot";
import { checkboxSchema } from "~/lib/schema/ui";

export const schema = object({
  targetFile: instance(File, [mimeType(["application/json"])]),
  dryRun: checkboxSchema,
  isReplace: checkboxSchema,
});

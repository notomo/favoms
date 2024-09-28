import {
  type InferOutput,
  instance,
  intersect,
  literal,
  mimeType,
  object,
  pipe,
  union,
} from "valibot";
import { idSchema } from "~/lib/schema/id";
import { checkboxSchema } from "~/lib/schema/ui";

const fileKindSchema = object({
  targetKind: literal("file"),
  targetFile: pipe(instance(File), mimeType(["application/json"])),
});

const historyKindSchema = object({
  targetKind: literal("history"),
  targetHistoryId: idSchema,
});

const sharedSchema = object({
  dryRun: checkboxSchema,
  isReplace: checkboxSchema,
});

export const schema = intersect([
  sharedSchema,
  union([fileKindSchema, historyKindSchema]),
]);

export type ImportSetting = InferOutput<typeof schema>;

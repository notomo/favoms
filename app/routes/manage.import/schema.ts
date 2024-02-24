import {
  object,
  transform,
  string,
  optional,
  instance,
  mimeType,
  array,
  number,
  minLength,
  minValue,
} from "valibot";

export const schema = object({
  targetFile: instance(File, [mimeType(["application/json"])]),
  dryRun: transform(optional(string(), ""), (x) => x === "on"),
  isReplace: transform(optional(string(), ""), (x) => x === "on"),
});

export const fileSchema = object({
  items: array(
    object({
      name: string([minLength(1)]),
      id: number([minValue(1)]),
    }),
  ),
});

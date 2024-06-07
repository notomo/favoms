import { optional, pipe, string, transform } from "valibot";

export const checkboxSchema = pipe(
  optional(string(), ""),
  transform((x) => x === "on"),
);

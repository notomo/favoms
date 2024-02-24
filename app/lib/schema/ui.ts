import { optional, string, transform } from "valibot";

export const checkboxSchema = transform(
  optional(string(), ""),
  (x) => x === "on",
);

import {
  coerce,
  literal,
  minValue,
  number,
  optional,
  parse,
  string,
  transform,
  union,
} from "valibot";

export const idSchema = coerce(number([minValue(1)]), Number);

export const optionalIdSchema = transform(
  union([optional(idSchema), literal("")]),
  (x) => (x ? x : undefined),
);

export const joinedIdsSchema = transform(optional(string(), ""), (x) =>
  x
    .split(",")
    .filter((x) => x.length > 0)
    .map((x) => parse(idSchema, x)),
);

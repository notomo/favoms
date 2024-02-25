import {
  coerce,
  minValue,
  number,
  optional,
  parse,
  string,
  transform,
} from "valibot";

export const idSchema = coerce(number([minValue(1)]), Number);

export const joinedIdsSchema = transform(optional(string(), ""), (x) =>
  x
    .split(",")
    .filter((x) => x.length > 0)
    .map((x) => parse(idSchema, x)),
);

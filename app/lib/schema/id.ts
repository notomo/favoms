import {
  minValue,
  optional,
  parse,
  string,
  transform,
  pipe,
  minLength,
} from "valibot";

export const idSchema = pipe(
  string(),
  transform((x) => Number(x)),
  minValue(1),
);

export const itemIdSchema = pipe(string(), minLength(1));

export const optionalItemIdSchema = pipe(
  optional(itemIdSchema, ""),
  transform((x) => x || undefined),
);

export const joinedItemIdsSchema = pipe(
  optional(string(), ""),
  transform((x) =>
    x
      .split(",")
      .filter((x) => x.length > 0)
      .map((x) => parse(itemIdSchema, x)),
  ),
);

export const joinedIdsSchema = pipe(
  optional(string(), ""),
  transform((x) =>
    x
      .split(",")
      .filter((x) => x.length > 0)
      .map((x) => parse(idSchema, x)),
  ),
);

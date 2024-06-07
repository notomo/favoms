import {
  literal,
  minValue,
  optional,
  parse,
  regex,
  string,
  transform,
  union,
  pipe,
} from "valibot";

export const idSchema = pipe(
  string(),
  transform((x) => Number(x)),
  minValue(1),
);

export const optionalIdSchema = pipe(
  union([optional(pipe(string(), regex(/[1-9][0-9]*/))), literal("")]),
  transform((x) => (x ? Number(x) : undefined)),
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

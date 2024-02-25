import { object, parse, string, transform } from "valibot";
import { idSchema } from "~/lib/schema/id";
import { mylistNameSchema } from "~/lib/schema/mylist";

export const createMylistSchema = object({
  name: mylistNameSchema,
});

export const editMylistsSchema = object({
  mylistIds: transform(string(), (x) =>
    x.split(",").map((x) => parse(idSchema, x)),
  ),
});

import { object, pipe, string, transform } from "valibot";
import { optionalItemIdSchema } from "~/lib/schema/id";
import { mylistNameSchema } from "~/lib/schema/mylist";
import { removeMylistParam } from "~/routePath/mylistRoute";

export const editMylistInfoSchema = object({
  name: mylistNameSchema,
  itemId: optionalItemIdSchema,
  searchParams: pipe(
    string(),
    transform((x) => {
      return removeMylistParam(x, "dialog");
    }),
  ),
});

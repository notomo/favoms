import { Input, object, string, transform } from "valibot";
import { joinedIdsSchema, optionalIdSchema } from "~/lib/schema/id";
import { removeCollectionParam } from "~/routePath/collectionRoute";

export const editMylistsSchema = object({
  mylistIds: joinedIdsSchema,
  itemId: optionalIdSchema,
  searchParams: transform(string(), (x) => {
    return removeCollectionParam(x, "edit");
  }),
});

export type InputSchema = Required<
  Record<keyof Input<typeof editMylistsSchema>, string>
>;

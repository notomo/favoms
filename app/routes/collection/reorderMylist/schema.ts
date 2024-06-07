import { InferInput, object, pipe, string, transform } from "valibot";
import { joinedIdsSchema, optionalIdSchema } from "~/lib/schema/id";
import { removeCollectionParam } from "~/routePath/collectionRoute";

export const editMylistsSchema = object({
  mylistIds: joinedIdsSchema,
  itemId: optionalIdSchema,
  searchParams: pipe(
    string(),
    transform((x) => {
      return removeCollectionParam(x, "edit");
    }),
  ),
});

export type InputSchema = Required<
  Record<keyof InferInput<typeof editMylistsSchema>, string>
>;

import { type InferInput, object, pipe, string, transform } from "valibot";
import { joinedIdsSchema, optionalItemIdSchema } from "~/lib/schema/id";
import { removeCollectionParam } from "~/routePath/collectionRoute";

export const editMylistsSchema = object({
  mylistIds: joinedIdsSchema,
  itemId: optionalItemIdSchema,
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

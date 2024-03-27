import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getItem } from "~/.server/persist/item";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const itemId = validateId(params.itemId);
  const item = await getItem(itemId);
  assertNotFound(item, "item is not found");
  return json(item);
};

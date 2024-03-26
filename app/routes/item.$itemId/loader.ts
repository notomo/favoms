import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getItem } from "~/.server/persist/item";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const itemId = validateId(params.itemId);
  const item = await getItem(itemId);
  if (item === null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return json(item);
};

import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { removeItemsFromMylist } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";
import { mylistRoute } from "~/route_path";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const mylistId = validateId(params.mylistId);

  const formData = await request.formData();
  // TODO: validate
  const rawItemIds = formData.get("itemIds") as string;
  const itemIds = rawItemIds.split(",").map((x) => Number(x));
  const mylist = await removeItemsFromMylist(mylistId, itemIds);
  return redirect(mylistRoute(mylist.id));
};

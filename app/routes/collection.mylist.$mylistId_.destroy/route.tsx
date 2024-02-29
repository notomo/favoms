import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteMylist } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";
import { collectionRoute } from "~/routePath";

export const action = async ({ params }: ActionFunctionArgs) => {
  const mylistId = validateId(params.mylistId);
  await deleteMylist(mylistId);
  return redirect(collectionRoute);
};

import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteMylist } from "~/.server/persist/mylist";
import { collectionRoute } from "~/route_path";

export const action = async ({ params }: ActionFunctionArgs) => {
  const mylistId = +params.mylistId!;
  await deleteMylist(mylistId);
  return redirect(collectionRoute);
};

import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { updateMylist } from "~/.server/persist/mylist";
import { mylistRoute } from "~/route_path";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // TODO: validate
  const mylistId = +params.mylistId!;
  const name = formData.get("name") as string;
  const mylist = await updateMylist(mylistId, { name });
  return redirect(mylistRoute(mylist.id));
};

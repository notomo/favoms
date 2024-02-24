import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { updateMylist } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";
import { mylistRoute } from "~/route_path";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // TODO: validate
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const mylistId = validateId(params.mylistId);
  const mylist = await updateMylist(mylistId, { name });
  return redirect(mylistRoute(mylist.id));
};

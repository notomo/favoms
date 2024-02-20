import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { reorderMylists } from "~/persist/mylist";
import { collectionRoute } from "~/route_path";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // TODO: validate
  const rawMylistIds = formData.get("mylistIds") as string;
  const mylistIds = rawMylistIds.split(",").map((x) => Number(x));
  await reorderMylists(mylistIds);
  return redirect(collectionRoute);
};

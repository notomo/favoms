import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { parseWithValibot } from "conform-to-valibot";
import { removeItemsFromMylist } from "~/.server/persist/mylist";
import { validateId } from "~/lib/schema/validation/params";
import { mylistRoute } from "~/route_path";
import { editMylistItemsSchema } from "~/routes/collection.mylist.$mylistId/schema";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const mylistId = validateId(params.mylistId);

  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: editMylistItemsSchema,
  });
  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const itemIds = submission.value.itemIds;
  await removeItemsFromMylist(mylistId, itemIds);
  return redirect(mylistRoute(mylistId));
};

import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { parseWithValibot } from "conform-to-valibot";
import { prisma } from "~/lib/prisma";
import { validateId } from "~/lib/schema/validation/params";
import { editMylistItemsSchema } from "./schema";
import { mylistRoute } from "~/routePath/mylistRoute";

export const doneItemEditAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
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
  return redirect(mylistRoute({ pathParams: { mylistId } }));
};

async function removeItemsFromMylist(mylistId: number, itemIds: number[]) {
  return await prisma.mylist.update({
    where: {
      id: mylistId,
    },
    data: {
      items: {
        disconnect: itemIds.map((id) => ({ id: id })),
      },
    },
  });
}

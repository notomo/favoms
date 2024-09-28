import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import type { useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { prisma } from "~/lib/prisma";
import { validateId } from "~/lib/schema/validation/params";
import { editMylistInfoSchema } from "./schema";
import { mylistRoute } from "~/routePath/mylistRoute";

export const editMylistInfoAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  const mylistId = validateId(params["mylistId"]);

  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: editMylistInfoSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const name = submission.value.name;
  const mylist = await updateMylistName(mylistId, name);

  return redirect(
    mylistRoute({
      pathParams: {
        mylistId: mylist.id,
        itemId: submission.value.itemId,
      },
      searchParams: submission.value.searchParams,
    }),
  );
};

export type EditMylistInfoActionData = ReturnType<
  typeof useActionData<typeof editMylistInfoAction>
>;

async function updateMylistName(id: number, name: string) {
  return await prisma.mylist.update({
    where: { id: id },
    data: { name },
  });
}

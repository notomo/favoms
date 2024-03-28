import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { prisma } from "~/lib/prisma";
import { collectionRoute } from "~/routePath";
import { editMylistsSchema } from "~/routes/collection/schema";

export const doneMylistsEditAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: editMylistsSchema,
  });
  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const mylistIds = submission.value.mylistIds;
  await reorderMylists(mylistIds);
  return redirect(collectionRoute());
};

export type DoneMylistsEditActionData = ReturnType<
  typeof useActionData<typeof doneMylistsEditAction>
>;

async function reorderMylists(mylistIds: number[]) {
  await prisma.$transaction([
    prisma.mylistOrder.deleteMany({
      where: {},
    }),
    prisma.mylistOrder.createMany({
      data: mylistIds.map((id, i) => ({
        mylistId: id,
        position: i,
      })),
    }),
  ]);
}

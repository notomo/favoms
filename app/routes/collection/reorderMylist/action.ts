import { parseWithValibot } from "conform-to-valibot";
import { type ActionFunctionArgs, redirect } from "react-router";
import { prisma } from "~/lib/prisma";
import { collectionRoute } from "~/routePath/collectionRoute";
import { editMylistsSchema } from "./schema";

export const doneMylistsEditAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: editMylistsSchema,
  });
  if (submission.status !== "success") {
    throw new Error(JSON.stringify(submission.reply().error));
  }

  const mylistIds = submission.value.mylistIds;
  await reorderMylists(mylistIds);

  throw redirect(
    collectionRoute({
      pathParams: { itemId: submission.value.itemId },
      searchParams: submission.value.searchParams,
    }),
  );
};

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

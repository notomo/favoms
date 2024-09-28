import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { validateId } from "~/lib/schema/validation/params";
import { prisma } from "~/lib/prisma";
import { importRoute } from "~/routePath/importRoute";

export async function deleteImportHistory({ params }: ActionFunctionArgs) {
  const importHistoryId = validateId(params["importHistoryId"]);

  await prisma.importHistory.delete({
    where: { id: importHistoryId },
  });

  return redirect(importRoute({}));
}

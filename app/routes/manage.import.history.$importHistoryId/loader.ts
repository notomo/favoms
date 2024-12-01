import type { LoaderFunctionArgs } from "react-router";
import { prisma } from "~/lib/prisma";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const importHistoryId = validateId(params["importHistoryId"]);
  const importHistory = await getImportHistory(importHistoryId).then((x) => {
    assertNotFound(x, "import history is not found");
    return x;
  });
  return importHistory;
};

export type ImportHistory = {
  id: number;
};

export async function getImportHistory(
  id: number,
): Promise<ImportHistory | null> {
  return await prisma.importHistory.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
}

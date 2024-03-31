import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { prisma } from "~/lib/prisma";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const histories = listImportHistories();
  return defer({
    histories,
    importHistoryId: params.importHistoryId,
  });
};

export type ImportHistory = {
  id: number;
  name: string;
  at: string;
};

async function listImportHistories(): Promise<ImportHistory[]> {
  const histories = await prisma.importHistory.findMany({
    where: {},
    orderBy: { at: "desc" },
    select: {
      id: true,
      name: true,
      at: true,
    },
  });
  return histories.map((x) => {
    return {
      ...x,
      at: x.at.toLocaleString(),
    };
  });
}

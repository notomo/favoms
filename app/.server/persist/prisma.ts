import { PrismaClient } from "@prisma/client";

import type { Prisma } from "@prisma/client";
export type { Prisma } from "@prisma/client";

type UpsertArgs<T> = Prisma.Args<T, "upsert">;
export type UpsertWhere<T> = UpsertArgs<T>["where"];
export type UpsertData<T> = UpsertArgs<T>["update"] & UpsertArgs<T>["create"];
export type CreateData<T> = Prisma.Args<T, "create">["data"];

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

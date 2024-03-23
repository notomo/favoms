import { PrismaClient } from "@prisma/client";

import type { Prisma } from "@prisma/client";
export type { Prisma } from "@prisma/client";

type UpsertArgs<T> = Prisma.Args<T, "upsert">;
export type UpsertWhere<T> = UpsertArgs<T>["where"];
export type UpsertData<T> = UpsertArgs<T>["update"] & UpsertArgs<T>["create"];
export type CreateData<T> = Prisma.Args<T, "create">["data"];

const prismaClientSingleton = () => {
  const client = new PrismaClient<
    Prisma.PrismaClientOptions,
    "query" | "error" | "warn" | "info"
  >({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "warn",
      },
      {
        emit: "event",
        level: "info",
      },
    ],
  });
  if (process.env.NODE_ENV !== "production") {
    client.$on("query", (e) => {
      console.log(JSON.stringify(e, null, 2));
    });
  }
  client.$on("error", (e) => {
    console.log(JSON.stringify(e, null, 2));
  });
  client.$on("warn", (e) => {
    console.log(JSON.stringify(e, null, 2));
  });
  client.$on("info", (e) => {
    console.log(JSON.stringify(e, null, 2));
  });
  return client;
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

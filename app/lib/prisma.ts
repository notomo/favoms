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
  if (process.env["NODE_ENV"] !== "production") {
    client.$on("query", (e) => {
      const { query, params, ...rest } = e;
      console.log(
        JSON.stringify(
          {
            query: query.slice(0, 100),
            params: params.slice(0, 100),
            ...rest,
          },
          null,
          2,
        ),
      );
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
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env["NODE_ENV"] !== "production") globalThis.prisma = prisma;

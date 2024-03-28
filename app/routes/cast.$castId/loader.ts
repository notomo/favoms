import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { prisma } from "~/lib/prisma";
import { assertNotFound } from "~/lib/response";
import { validateId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const castId = validateId(params.castId);
  const cast = getCast(castId).then((x) => {
    assertNotFound(x, "cast is not found");
    return x;
  });
  return defer({
    cast,
  });
};

export type Cast = {
  id: number;
  name: string;
  videos: Video[];
};

export type Video = {
  itemId: number;
  title: string;
};

async function getCast(castId: number): Promise<Cast | null> {
  return await prisma.cast.findUnique({
    where: { id: castId },
    select: {
      id: true,
      name: true,
      nameRuby: true,
      videos: {
        select: {
          title: true,
          titleRuby: true,
          itemId: true,
        },
      },
    },
  });
}

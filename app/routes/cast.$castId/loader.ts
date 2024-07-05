import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { prisma } from "~/lib/prisma";
import { assertNotFound } from "~/lib/response";
import { validateStringId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const castId = validateStringId(params.castId);
  const cast = getCast(castId).then((x) => {
    assertNotFound(x, "cast is not found");
    return x;
  });
  return defer({
    cast,
  });
};

export type Cast = {
  id: string;
  name: string;
  videos: Video[];
};

export type Video = {
  itemId: string;
  title: string;
};

async function getCast(castId: string): Promise<Cast | null> {
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

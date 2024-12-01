import type { LoaderFunctionArgs } from "react-router";
import { prisma } from "~/lib/prisma";
import { assertNotFound } from "~/lib/response";
import { validateStringId } from "~/lib/schema/validation/params";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const castId = validateStringId(params["castId"]);
  const cast = getCast(castId).then((x) => {
    assertNotFound(x, "cast is not found");
    return x;
  });
  return {
    cast,
  };
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
  const cast = await prisma.cast.findUnique({
    where: { id: castId },
    select: {
      id: true,
      name: true,
      castings: {
        select: {
          video: {
            select: {
              title: true,
              titleRuby: true,
              itemId: true,
            },
          },
        },
      },
    },
  });

  if (cast === null) {
    return null;
  }

  return {
    id: cast.id,
    name: cast.name,
    videos: cast.castings.map((x) => x.video),
  };
}

import { safeParse } from "valibot";
import { idSchema, itemIdSchema } from "~/lib/schema/id";

export const validateId = (rawId: string | undefined): number => {
  const validated = safeParse(idSchema, rawId);
  if (!validated.success) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return validated.output;
};

export const validateItemId = (rawId: string | undefined): string => {
  const validated = safeParse(itemIdSchema, rawId);
  if (!validated.success) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return validated.output;
};

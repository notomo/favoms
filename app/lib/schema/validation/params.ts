import { safeParse } from "valibot";
import { idSchema, stringIdSchema } from "~/lib/schema/id";

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

export const validateStringId = (rawId: string | undefined): string => {
  const validated = safeParse(stringIdSchema, rawId);
  if (!validated.success) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return validated.output;
};

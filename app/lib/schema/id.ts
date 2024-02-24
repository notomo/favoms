import { coerce, minValue, number } from "valibot";

export const idSchema = coerce(number([minValue(1)]), Number);

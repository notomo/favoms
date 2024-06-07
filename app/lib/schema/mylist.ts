import { maxLength, minLength, string, pipe } from "valibot";

export const mylistNameSchema = pipe(string(), minLength(1), maxLength(100));

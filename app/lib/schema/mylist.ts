import { maxLength, minLength, pipe, string } from "valibot";

export const mylistNameSchema = pipe(string(), minLength(1), maxLength(100));

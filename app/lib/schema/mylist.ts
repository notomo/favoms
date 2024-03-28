import { maxLength, minLength, string } from "valibot";

export const mylistNameSchema = string([minLength(1), maxLength(100)]);

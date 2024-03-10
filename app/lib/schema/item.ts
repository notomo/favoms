import {
  object,
  array,
  union,
  literal,
  nullable,
  date,
  string,
  minLength,
  maxLength,
  Output,
} from "valibot";

const nameSchema = ({ min, max }: { min: number; max: number }) => {
  return string([minLength(min), maxLength(max)]);
};

const bookAuthorSchema = object({
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const bookPublisherSchema = object({
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const bookSchema = object({
  kind: literal("book"),
  title: nameSchema({ min: 1, max: 1000 }),
  titleRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
  authors: array(bookAuthorSchema),
  publishers: array(bookPublisherSchema),
  publishedAt: nullable(date()),
});

export const itemImportSchema = union([bookSchema]);

export type ImportItem = Output<typeof itemImportSchema>;

import {
  object,
  array,
  literal,
  nullable,
  string,
  minLength,
  maxLength,
  Output,
  transform,
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
  // TODO: validate date format
  publishedAt: transform(nullable(string()), (x) => (x ? new Date(x) : null)),
});

const castSchema = object({
  name: nameSchema({ min: 1, max: 1000 }),
  nameRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
});

const videoSchema = object({
  kind: literal("video"),
  title: nameSchema({ min: 1, max: 1000 }),
  titleRuby: nullable(nameSchema({ min: 0, max: 1000 }), ""),
  casts: array(castSchema),
  // TODO: validate date format
  publishedAt: transform(nullable(string()), (x) => (x ? new Date(x) : null)),
});

export const itemImportSchema = object({
  books: array(bookSchema),
  videos: array(videoSchema),
});

export type ItemImport = Output<typeof itemImportSchema>;

export const switchKind = <Book, Video>(
  book: Book | null,
  video: Video | null,
): { kind: "book"; inner: Book } | { kind: "video"; inner: Video } => {
  if (book !== null) {
    return {
      kind: "book",
      inner: book,
    };
  }
  if (video !== null) {
    return {
      kind: "video",
      inner: video,
    };
  }
  throw new Error("book or video must be not null");
};

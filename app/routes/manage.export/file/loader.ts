import { createReadableStreamFromReadable } from "@remix-run/node";
import { Readable } from "node:stream";

export const loader = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  const file = createReadableStreamFromReadable(Readable.from(["{}"]));
  return new Response(file, {
    headers: {
      "Content-Disposition": 'attachment; filename="favoms.json"',
      "Content-Type": "application/json",
    },
  });
};

export function assertNotFound<T>(
  value: T | null,
  message: string,
): asserts value is T {
  if (value !== null) {
    return;
  }
  throw new Response(null, {
    status: 404,
    statusText: message,
  });
}

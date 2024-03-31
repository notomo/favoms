import { useLoaderData } from "@remix-run/react";
import { DeleteHistoryButton } from "./delete/button";
import { loader } from "./loader";

export { loader } from "./loader";

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return <DeleteHistoryButton importHistoryId={loaderData.id} />;
}

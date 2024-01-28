import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.mylistId });
};

export default function Page() {
  const { id } = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full border">
      <div>mylist child {id}</div>
    </div>
  );
}

import { useFetcher } from "@remix-run/react";
import { Trash } from "lucide-react";
import { Button } from "~/component/ui/button";
import { LoadingOr } from "~/component/ui/loading";

export const DeleteHistoryButton = () => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form method="DELETE" action="delete">
      <Button variant="ghost" type="submit" size="icon" disabled={isSubmitting}>
        <LoadingOr isLoading={isSubmitting}>
          <Trash size={20} />
        </LoadingOr>
      </Button>
    </fetcher.Form>
  );
};

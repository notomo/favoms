import { useFetcher } from "@remix-run/react";
import { Trash } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "~/component/ui/button";
import { LoadingOr } from "~/component/ui/loading";

export const DeleteHistoryButton = ({
  importHistoryId,
}: {
  importHistoryId: number;
}) => {
  const fetcher = useFetcher();

  const onSubmit = (e: FormEvent) => {
    const data = {
      importHistoryId,
    };
    fetcher.submit(data, { method: "DELETE", action: "delete" });
    e.preventDefault();
  };

  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form onSubmit={onSubmit}>
      <Button variant="ghost" type="submit" size="icon" disabled={isSubmitting}>
        <LoadingOr isLoading={isSubmitting}>
          <Trash size={20} />
        </LoadingOr>
      </Button>
    </fetcher.Form>
  );
};

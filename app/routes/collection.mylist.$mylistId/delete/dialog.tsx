import { useFetcher } from "@remix-run/react";
import { Button } from "~/component/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/component/ui/dialog";
import { LoadingOr } from "~/component/ui/loading";

export const DeleteMylistDialog = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <fetcher.Form method="delete" action="delete">
      <DialogHeader>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the mylist?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" variant="destructive" disabled={isSubmitting}>
          <LoadingOr isLoading={isSubmitting}>Delete</LoadingOr>
        </Button>
      </DialogFooter>
    </fetcher.Form>
  );
};

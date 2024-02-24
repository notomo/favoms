import { Label } from "~/component/ui/label";
import { Textarea } from "~/component/ui/textarea";

export const ContentErrorMessage = ({ error }: { error?: string }) => {
  const message =
    error !== undefined ? JSON.stringify(JSON.parse(error), null, 2) : "";

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <Label className="text-xl" htmlFor="errorMessage">
        Error message
      </Label>
      <Textarea
        readOnly
        id="errorMessage"
        className="h-full w-full border border-gray-600 text-xl"
        value={message}
      />
    </div>
  );
};

import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/component/ui/button";
import { Checkbox } from "~/component/ui/checkbox";
import { Input } from "~/component/ui/input";
import { Label } from "~/component/ui/label";
import { Textarea } from "~/component/ui/textarea";

export const meta: MetaFunction = () => {
  return [{ title: "Import | favoms" }];
};

export default function Index() {
  return (
    <div className="flex h-full w-full items-start justify-start gap-4 p-4 py-8">
      <form className="flex flex-col gap-8 p-4">
        <Button className="text-lg" type="submit" size="lg">
          Import
        </Button>

        <div className="flex flex-col gap-2">
          <Label className="text-lg" htmlFor="file">
            File
          </Label>
          <Input
            type="file"
            id="file"
            name="targetFile"
            required
            accept=".json"
            className="bg-primary text-black"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="dryRun" name="dryRun" />
          <Label className="text-lg" htmlFor="dry-run">
            Dry run
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="replace" name="isReplace" />
          <Label className="text-lg" htmlFor="replace">
            Replace
          </Label>
        </div>
      </form>
      <div className="flex h-full w-full flex-col gap-2 p-4">
        <Label className="text-xl" htmlFor="error-message">
          Error message
        </Label>
        <Textarea
          readOnly
          id="error-message"
          className="h-full w-full border border-gray-600"
        />
      </div>
    </div>
  );
}

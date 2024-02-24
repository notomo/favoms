import { Checkbox } from "~/component/ui/checkbox";
import { Label } from "~/component/ui/label";
import { FieldMetadata, getInputProps } from "@conform-to/react";
import { Input } from "~/component/ui/input";
import { Button } from "~/component/ui/button";
import { Loader2 } from "lucide-react";

export const SubmitButton = ({
  isSubmitting,
  children,
}: React.PropsWithChildren<{ isSubmitting: boolean }>) => {
  return (
    <Button className="text-lg" type="submit" size="lg" disabled={isSubmitting}>
      {isSubmitting ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export const BooleanInput = ({
  field,
  children,
}: React.PropsWithChildren<{ field: FieldMetadata<boolean> }>) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={field.id} name={field.name} />
      <Label className="text-lg" htmlFor={field.id}>
        {children}
      </Label>
      <ErrorMessage errors={field.errors} />
    </div>
  );
};

export const FileInput = ({
  field,
  children,
}: React.PropsWithChildren<{ field: FieldMetadata<File> }>) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg" htmlFor={field.id}>
        {children}
      </Label>
      <Input
        {...getInputProps(field, { type: "file" })}
        accept=".json"
        className="bg-primary text-black"
      />
      <ErrorMessage errors={field.errors} />
    </div>
  );
};

const ErrorMessage = ({ errors }: { errors: string[] | undefined }) => {
  if (errors === undefined) {
    return null;
  }
  return <div className="text-orange-200">{errors}</div>;
};

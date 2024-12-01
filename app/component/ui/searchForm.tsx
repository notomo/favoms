import { Search, X } from "lucide-react";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Form, useNavigation } from "react-router";
import { Button } from "~/component/ui/button";
import { Input } from "~/component/ui/input";
import { LoadingOr } from "~/component/ui/loading";

const ResetableInput = ({
  query,
  placeholder,
}: {
  query: string;
  placeholder: string;
}) => {
  const input = useRef<HTMLInputElement>(null);

  useHotkeys(
    "/",
    (event) => {
      event.preventDefault();

      const current = input.current;
      if (current === null) {
        return;
      }

      const end = current.value.length;
      current.focus();
      current.setSelectionRange(end, end);
    },
    {
      preventDefault: true,
    },
    [input.current],
  );

  return (
    <div className="flex w-full gap-2 rounded-md border border-input">
      <Input
        ref={input}
        defaultValue={query}
        placeholder={placeholder}
        name="query"
        autoComplete="off"
        className="border-none focus-visible:ring-0"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => {
          const current = input.current;
          if (current === null) {
            return;
          }
          current.value = "";
        }}
      >
        <X size={20} />
      </Button>
    </div>
  );
};

export const SearchForm = ({
  query,
  placeholder,
}: {
  query: string;
  placeholder: string;
}) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Form
      method="GET"
      className="flex items-center gap-2"
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);
        const formQuery = formData.get("query");
        if (formQuery !== query) {
          return;
        }
        e.preventDefault();
      }}
    >
      <ResetableInput query={query} placeholder={placeholder} />
      <Button type="submit" size="icon" variant="ghost" disabled={isLoading}>
        <LoadingOr isLoading={isLoading}>
          <Search size={24} />
        </LoadingOr>
      </Button>
    </Form>
  );
};

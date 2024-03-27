import { Form, useNavigation } from "@remix-run/react";
import { Search } from "lucide-react";
import { Button } from "~/component/ui/button";
import { Input } from "~/component/ui/input";
import { LoadingOr } from "~/component/ui/loading";

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
    <Form method="GET" className="flex items-center gap-2">
      <Input defaultValue={query} placeholder={placeholder} name="query" />
      <Button type="submit" size="icon" variant="ghost" disabled={isLoading}>
        <LoadingOr isLoading={isLoading}>
          <Search size={24} />
        </LoadingOr>
      </Button>
    </Form>
  );
};

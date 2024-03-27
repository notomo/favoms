import { bookAuthorRoute } from "~/routePath";
import { BookAuthor } from "./loader";
import { NavigationLink } from "~/component/ui/navigationLink";
import { cn } from "~/lib/tailwind";

export const BookAuthorLinks = ({
  bookAuthors,
  page,
  query,
}: {
  bookAuthors: BookAuthor[];
  page: number;
  query: string;
}) => {
  return bookAuthors.map(({ id, name }) => {
    const path = bookAuthorRoute(id, page, query);
    return (
      <BookAuthorLink path={path} key={id}>
        {name}
      </BookAuthorLink>
    );
  });
};

export const BookAuthorLink = ({
  children,
  path,
}: React.PropsWithChildren<{ path: string }>) => {
  return (
    <NavigationLink path={path}>
      <BookAuthorRow>{children}</BookAuthorRow>
    </NavigationLink>
  );
};

export const BookAuthorRow = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("border-b bg-inherit p-4", className)}>{children}</div>
  );
};

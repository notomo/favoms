import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/component/ui/button";
import { Dialog, DialogContent } from "~/component/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/component/ui/dropdownMenu";
import {
  type CollectionDialogType,
  collectionRoute,
} from "~/routePath/collectionRoute";
import { CreateMylistDialog } from "./createMylist/dialog";

export const CollectionsDropDownMenu = ({
  className,
  dialogType,
}: {
  className?: string;
  dialogType: CollectionDialogType;
}) => {
  const navigate = useNavigate();
  const rawPathParams = useParams();
  const [searchParams] = useSearchParams();
  const close = () => {
    navigate(
      collectionRoute({
        queryParams: { dialog: undefined },
        rawPathParams,
        searchParams,
      }),
    );
  };

  return (
    <div className={className}>
      <Dialog open={dialogType !== undefined} onOpenChange={close}>
        <DialogContent>
          <CreateMylistDialog />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border" align="start">
          <DropdownMenuButton asChild>
            <Link
              to={collectionRoute({
                queryParams: { dialog: "new" },
                rawPathParams,
                searchParams,
              })}
            >
              New
            </Link>
          </DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link
              to={collectionRoute({
                queryParams: { edit: "mylists" },
                rawPathParams,
                searchParams,
              })}
            >
              Edit mylists
            </Link>
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

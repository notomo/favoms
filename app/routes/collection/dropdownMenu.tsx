import { CreateMylistDialog } from "./createMylist/dialog";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuButton,
} from "~/component/ui/dropdownMenu";
import { DialogContent, Dialog } from "~/component/ui/dialog";
import { CollectionDialogType, mylistsEditRoute } from "~/routePath";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { collectionRoute } from "~/routePath/collectionRoute";

export const CollectionsDropDownMenu = ({
  className,
  dialogType,
}: {
  className?: string;
  dialogType: CollectionDialogType;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const close = () => {
    navigate(
      collectionRoute({
        queryParams: { dialog: undefined },
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
                searchParams,
              })}
            >
              New
            </Link>
          </DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link to={mylistsEditRoute()}>Edit mylists</Link>
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

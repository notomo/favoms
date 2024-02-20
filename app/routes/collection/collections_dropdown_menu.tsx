import { CreateMylistDialog } from "./create_mylist_dialog";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuButton,
} from "~/component/ui/dropdown-menu";
import { useState } from "react";
import { DialogContent, Dialog } from "~/component/ui/dialog";
import { mylistsEditRoute } from "~/route_path";
import { Link } from "@remix-run/react";

export const CollectionsDropDownMenu = ({
  className,
}: {
  className?: string;
}) => {
  const [dialogIsOpened, setDialogIsOpened] = useState(false);
  const openDialog = () => setDialogIsOpened(true);
  const close = () => setDialogIsOpened(false);

  return (
    <div className={className}>
      <Dialog open={dialogIsOpened} onOpenChange={close}>
        <DialogContent onSubmit={close}>
          <CreateMylistDialog />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border border-gray-600" align="start">
          <DropdownMenuButton onClick={openDialog}>New</DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link to={mylistsEditRoute()}>Edit mylists</Link>
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

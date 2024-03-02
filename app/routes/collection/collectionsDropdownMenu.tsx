import { CreateMylistDialog } from "./createMylistDialog";
import { Button } from "~/component/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuButton,
} from "~/component/ui/dropdownMenu";
import { useState } from "react";
import { DialogContent, Dialog } from "~/component/ui/dialog";
import { mylistsEditRoute } from "~/routePath";
import { Link } from "@remix-run/react";

export const CollectionsDropDownMenu = ({
  className,
}: {
  className?: string;
}) => {
  const [dialogIsOpened, setDialogIsOpened] = useState(false);
  const openDialog = () => setDialogIsOpened(true);
  const closeDialog = () => setDialogIsOpened(false);

  return (
    <div className={className}>
      <Dialog open={dialogIsOpened} onOpenChange={closeDialog}>
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
          <DropdownMenuButton onClick={openDialog}>New</DropdownMenuButton>

          <DropdownMenuButton asChild>
            <Link to={mylistsEditRoute()}>Edit mylists</Link>
          </DropdownMenuButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
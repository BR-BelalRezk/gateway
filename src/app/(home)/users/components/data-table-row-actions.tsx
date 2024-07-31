"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserRow, userSchema } from "../schema";
import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserModal } from "@/components/modals/user-modal";
import { DeleteUserAlert } from "@/components/modals/delete-user-modal";

interface DataTableRowActionsProps {
  row: Row<UserRow>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const user = userSchema.parse(row.original);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="relative sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <UserModal
          isEdit
          initialData={{
            id: user.id,
            formData: {
              username: user.name,
              email: user.email,
              role: user.role.value,
              branch: user.branch.value.toString(),
            },
          }}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
        </UserModal>

        <DropdownMenuSeparator />
        <DeleteUserAlert
          userId={user.id}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              {user.isActivated ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DeleteUserAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

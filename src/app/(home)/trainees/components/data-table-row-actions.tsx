"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { UserModal } from "@/components/modals/user-modal";
import { DeleteUserAlert } from "@/components/modals/delete-user-modal";
import { TraineeRow, traineeSchema } from "../../pending-test/schema";

interface DataTableRowActionsProps {
  row: Row<TraineeRow>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const user = traineeSchema.parse(row.original);
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
        <DropdownMenuItem
          onSelect={() => {
            router.push(`/trainees/${user.id}`);
          }}
        >
          View
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

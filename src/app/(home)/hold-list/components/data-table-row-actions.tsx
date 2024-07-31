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

import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  HoldListTraineeRow,
  holdListTraineeSchema,
} from "@/app/(home)/hold-list/schema";
import { TraineeModal } from "@/components/modals/trainee-modal";
import { DeleteTraineeAlert } from "@/components/modals/delete-trainee-modal";
import { AssignClassModal } from "@/components/modals/assign-class-modal";
import { MoveToWaitingListAlert } from "@/components/modals/move-to-waiting-list-modal";

interface DataTableRowActionsProps {
  row: Row<HoldListTraineeRow>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const rowData = holdListTraineeSchema.parse(row.original);
  const user = rowData.trainee;
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
        <TraineeModal
          isEdit
          onSuccess={() => {
            router.refresh();
          }}
          initialData={{
            id: user.id.toString(),
            formData: {
              fullName: user.fullName,
              birthDate: user.birthdate ? new Date(user.birthdate) : undefined,
              mobileNumber: user.mobile,
              email: user.email ?? "",
              city: user.city?.id.toString(),
              branch: user.branch.id.toString(),
              attendType: user.attendType ?? "",
              notes: user.notes ?? undefined,
              education: user.education ?? undefined,
              job: user.job ?? undefined,
              preferredSlot: user.preferredSlot?.id.toString(),
              secondPreferredSlot: user.secondPreferredSlot?.id.toString(),
              country: user.country?.id.toString(),
              level: user.level?.id.toString(),
              followUpUser: user?.followUpUser?.map((user) => user.id.toString()),
            },
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
        </TraineeModal>
        <MoveToWaitingListAlert
          traineeIds={[user.id.toString()]}
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
              Move to Waiting List
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </MoveToWaitingListAlert>

        <DropdownMenuSeparator />
        <DeleteTraineeAlert
          traineeId={user.id.toString()}
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
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DeleteTraineeAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

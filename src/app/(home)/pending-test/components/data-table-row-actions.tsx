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

import { FilterPossibleValues } from "@/types/columns";
import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  TraineeRow,
  traineeSchema,
} from "@/app/(home)/pending-test/schema";

import { format } from "date-fns";
import { TraineeModal } from "@/components/modals/trainee-modal";
import { AssignLevelModal } from "@/components/modals/assign-level-modal";
import { AssignTrainerModal } from "@/components/modals/assign-trainer-modal";
import { DeleteTraineeAlert } from "@/components/modals/delete-trainee-modal";

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
              preferredDayForTest: user.preferredDayForTest ?? undefined,
              preferredTimeForTest: user.startTimeForTest ?? undefined,
              branch: user.branch.id.toString(),
              attendType: user.attendType ?? "",
              notes: user.notes ?? undefined,
              education: user.education ?? undefined,
              job: user.job ?? undefined,
              preferredSlot: user.preferredSlot?.id.toString(),
              secondPreferredSlot: user.secondPreferredSlot?.id.toString(),
              country: user.country?.id.toString(),
              level: user.level?.id.toString(),
              followUpUser: user.followUpUser?.map((user) => user.id.toString()),
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
        <AssignLevelModal
          traineeId={user.id.toString()}
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
              Assign Level
            </DropdownMenuItem>
          </DialogTrigger>
        </AssignLevelModal>

        <AssignTrainerModal
          traineeIds={[user.id.toString()]}
          initialData={
            user.assignedTrainer
              ? {
                  trainer: user.assignedTrainer.id.toString(),
                  testDate: new Date(user.testDate!),
                  testTime: format(new Date(user.testDate!), "HH:mm:ss"),
                }
              : undefined
          }
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
              Assign Trainer
            </DropdownMenuItem>
          </DialogTrigger>
        </AssignTrainerModal>

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

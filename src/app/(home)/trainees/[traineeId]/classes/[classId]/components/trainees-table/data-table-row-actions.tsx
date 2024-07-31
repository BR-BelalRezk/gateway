"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { ClassTrainee, classTraineeSchema } from "@/app/(home)/batches/schema";
import { DialogTrigger } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { AddToClassAttendanceModal } from "@/components/modals/add-to-class-attendance-modal";
import { SwitchClassModal } from "@/components/modals/switch-class-modal";
import { RemoveFromClassAlert } from "@/components/modals/remove-from-class-modal";
import { MoveToHoldingListModal } from "@/components/modals/move-holding-list";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { AddNoteOnTraineeFromTrainerModal } from "@/components/modals/add-note-on-trainee-from-trainer-modal";
import { useUser } from "@/providers/user";

interface DataTableRowActionsProps {
  row: Row<ClassTrainee>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const user = classTraineeSchema.parse(row.original);
  const loggedUser = useUser();
  const router = useRouter();

  //console.log("user", loggedUser)

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
      <AddNoteOnTraineeFromTrainerModal
          traineeId={user.trainee.id.toString()}
          classId={user.classId.toString()}
          isAdminNotes={false}
          //levelId={"1"}
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
             Add Trainer Note
            </DropdownMenuItem>
          </DialogTrigger>
        </AddNoteOnTraineeFromTrainerModal>
        {loggedUser.user.role.toLowerCase() != "admin" && loggedUser.user.role.toLowerCase() != "supermanager"  ? null : (<AddNoteOnTraineeFromTrainerModal
          traineeId={user.trainee.id.toString()}
          classId={user.classId.toString()}
          isAdminNotes={true}
          //levelId={"1"}
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
              Leave Admin Note to trainer
            </DropdownMenuItem>
          </DialogTrigger>
        </AddNoteOnTraineeFromTrainerModal>)}
        <AddToClassAttendanceModal
          traineeId={user.trainee.id.toString()}
          branchId={user.trainee.branch!.id.toString()}
          levelId={"1"}
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
              Add trainee to class attendance
            </DropdownMenuItem>
          </DialogTrigger>
        </AddToClassAttendanceModal>
        <SwitchClassModal
          traineeId={user.trainee.id.toString()}
          branchId={user.trainee.branch!.id.toString()}
          //levelId={"1"}
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
              Switch Class
            </DropdownMenuItem>
          </DialogTrigger>
        </SwitchClassModal>
        <RemoveFromClassAlert
          traineeId={user.trainee.id.toString()}
          classId={user.classId.toString()}
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
              Remove From Class
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </RemoveFromClassAlert>

        <MoveToHoldingListModal
          traineeIds={[user.trainee.id.toString()]}
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
              Hold
            </DropdownMenuItem>
          </DialogTrigger>
        </MoveToHoldingListModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

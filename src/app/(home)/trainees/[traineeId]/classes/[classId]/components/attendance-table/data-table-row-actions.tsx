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

import { useRouter } from "next/navigation";
import { ClassTrainee, TraineeInAttendance, classTraineeSchema, traineeInAttendanceSchema } from "@/app/(home)/batches/schema";
import { AddNotesToAttendanceModal } from "@/components/modals/add-notes-to-attendance-modal";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { AddNoteOnTraineeFromTrainerModal } from "@/components/modals/add-note-on-trainee-from-trainer-modal";

interface DataTableRowActionsProps {
  row: Row<TraineeInAttendance>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const user = traineeInAttendanceSchema.parse(row.original);
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
        {/* <UserFormModal
          roles={roles}
          branches={branches}
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
          <DialogTrigger asChild> */}
        {/* <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          Edit
        </DropdownMenuItem> */}
        {/* </DialogTrigger>
        </UserFormModal> */}

        <AddNotesToAttendanceModal
        classId={row.original.classId.toString()}
        traineeId={row.original.trainee.id.toString()}
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
              Add Session Notes
            </DropdownMenuItem>
          </DialogTrigger>
        </AddNotesToAttendanceModal>
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
        {/* <DropdownMenuSeparator /> */}
        {/* <DeleteUserAlert
          userId={user.id}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <AlertDialogTrigger asChild> */}
        {/* <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
          }}
        >
          Delete
        </DropdownMenuItem> */}

        {/* </AlertDialogTrigger>
        </DeleteUserAlert> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

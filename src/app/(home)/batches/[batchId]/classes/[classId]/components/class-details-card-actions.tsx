"use client";

import { Class, Room } from "@/app/(home)/batches/schema";
import { ClassModal } from "@/components/modals/class-modal";
import { DeleteClassAlert } from "@/components/modals/delete-class-modal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterPossibleValues } from "@/types/columns";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const ClassDetailsCardActions = ({
  classData,
}: {
  classData: Class;
}) => {
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
        <ClassModal
          isEdit
          initialData={{
            id: classData.id.toString(),
            formData: {
              name: classData.name,
              type: classData.typeId.toString(),
              batch: classData.batchId.toString(),
              room: classData.roomId.toString(),
              timeSlot: classData.timeSlotId.toString(),
              trainer: classData.trainerId.toString(),
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
        </ClassModal>

        <DropdownMenuSeparator />
        <DeleteClassAlert
          classId={classData.id.toString()}
          onSuccess={() => {
            router.replace("/batches");
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
        </DeleteClassAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

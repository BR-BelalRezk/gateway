"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AddNoteOnTraineeFromTrainer,
  AddNoteOnTraineeFromTrainerValues,
} from "./add-note-on-trainee-from-trainer-form";

interface AddNoteOnTraineeFromTrainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isEdit?: boolean;
  classId:string,
  isAdminNotes:boolean;
  traineeId:string,
  initialData?: {
    id?: string;
    formData: Partial<AddNoteOnTraineeFromTrainerValues>;
  };
  onSuccess?: () => void;
}

export function AddNoteOnTraineeFromTrainerModal({
  children,
  isEdit = false,
  classId,
  traineeId,
  isAdminNotes,
  initialData,
  onSuccess,
}: AddNoteOnTraineeFromTrainerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AddNoteOnTraineeFromTrainer
        classId={classId}
        traineeId={traineeId}
        isAdminNotes={isAdminNotes}
          initialData={initialData}
          onSuccess={() => {
            onSuccess?.();
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

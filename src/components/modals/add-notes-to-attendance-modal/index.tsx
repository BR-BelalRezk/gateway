"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import {
  AddNotesToAttendanceFormValues,
  AddNotesToAttendanceForm,
} from "./add-notes-to-attendance-form";

interface AddNotesToAttendanceFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  traineeId: string;
  classId: string;
  attendance?: any;
  initialData?: AddNotesToAttendanceFormValues;
  onSuccess?: () => void;
}

export function AddNotesToAttendanceModal({
  traineeId,
  classId,
  children,
  attendance,
  initialData,
  onSuccess
}: AddNotesToAttendanceFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AddNotesToAttendanceForm
          traineeId={traineeId}
          classId={classId}
          attendance={attendance}
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

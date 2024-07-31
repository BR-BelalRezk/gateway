"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import {
  AddToClassAttendanceFormValues,
  AddToClassAttendanceForm,
} from "./add-to-class-attendance-form";

interface AddToClassAttendanceFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  traineeId: string;
  branchId: string;
  levelId: string;
  initialData?: AddToClassAttendanceFormValues;
  onSuccess?: () => void;
}

export function AddToClassAttendanceModal({
  traineeId,
  branchId,
  levelId,
  children,
  initialData,
  onSuccess,
}: AddToClassAttendanceFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AddToClassAttendanceForm
          traineeId={traineeId}
          branchId={branchId}
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

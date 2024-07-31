"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { AssignClassForm, AssignClassFormValues } from "./assign-class-form";


interface AssignClassFormProps extends React.HTMLAttributes<HTMLDivElement> {
  traineeIds: string[];
  branchId: string;
  initialData?: AssignClassFormValues;
  onSuccess?: () => void;
}

export function AssignClassModal({
  traineeIds,
  branchId,
  children,
  initialData,
  onSuccess,
}: AssignClassFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AssignClassForm
          branchId={branchId}
          traineeIds={traineeIds}
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

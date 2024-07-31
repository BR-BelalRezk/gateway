"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import {
  AssignTrainerForm,
  AssignTrainerFormValues,
} from "./assign-trainer-form";
import { getTrainers } from "@/app/(home)/pending-test/actions";

interface AssignTrainerFormProps extends React.HTMLAttributes<HTMLDivElement> {
  traineeIds: string[];
  initialData?: AssignTrainerFormValues;
  onSuccess?: () => void;
}

export function AssignTrainerModal({
  traineeIds,
  children,
  initialData,
  onSuccess,
}: AssignTrainerFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AssignTrainerForm
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

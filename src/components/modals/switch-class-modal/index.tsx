"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { SwitchClassForm, SwitchClassFormValues } from "./switch-class-form";


interface SwitchClassFormProps extends React.HTMLAttributes<HTMLDivElement> {
  traineeId: string;
  branchId: string;
  initialData?: SwitchClassFormValues;
  onSuccess?: () => void;
}

export function SwitchClassModal({
  traineeId,
  branchId,
  children,
  initialData,
  onSuccess,
}: SwitchClassFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <SwitchClassForm
          branchId={branchId}
          traineeId={traineeId}
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

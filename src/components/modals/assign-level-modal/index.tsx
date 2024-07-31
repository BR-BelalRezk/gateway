"use client";

import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { AssignLevelForm, AssignLevelFormValues } from "./assign-level-form";
import { getLevels } from "@/app/(home)/pending-test/actions";

interface AssignLevelFormProps extends React.HTMLAttributes<HTMLDivElement> {
  traineeId: string;
  initialData?: AssignLevelFormValues;
  onSuccess?: () => void;
}

export function AssignLevelModal({
  traineeId,
  children,
  initialData,
  onSuccess,
}: AssignLevelFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AssignLevelForm
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

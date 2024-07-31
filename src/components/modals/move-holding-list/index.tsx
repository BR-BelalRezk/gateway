"use client";

import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { MoveToHoldingListForm, MoveToHoldingListFormValues } from "./move-holding-list-form";
import { getLevels } from "@/app/(home)/pending-test/actions";

interface MoveToHoldingListFormProps extends React.HTMLAttributes<HTMLDivElement> {
  traineeIds: string[];
  initialData?: MoveToHoldingListFormValues;
  onSuccess?: () => void;
}

export function MoveToHoldingListModal({
  traineeIds,
  children,
  initialData,
  onSuccess,
}: MoveToHoldingListFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <MoveToHoldingListForm
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

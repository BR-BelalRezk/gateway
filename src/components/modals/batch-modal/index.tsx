"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { BatchForm, BatchFormValues } from "./batch-form";

interface BatchFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    formData: Partial<BatchFormValues>;
  };
  onSuccess?: () => void;
}

export function BatchModal({
  children,
  isEdit = false,
  initialData,
  onSuccess,
}: BatchFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <BatchForm
          isEdit={isEdit}
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

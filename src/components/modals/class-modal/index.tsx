"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ClassForm, ClassFormValues } from "./class-form";

interface ClassFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    formData: Partial<ClassFormValues>;
  };
  onSuccess?: () => void;
}

export function ClassModal({
  children,
  isEdit = false,
  initialData,
  onSuccess,
}: ClassFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <ClassForm
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

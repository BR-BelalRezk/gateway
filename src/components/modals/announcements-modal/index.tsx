"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AnnouncementForm,
  AnnouncementFormValues,
} from "./announcements-form";

interface AnnouncementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    formData: Partial<AnnouncementFormValues>;
  };
  onSuccess?: () => void;
}

export function AnnouncementFormModal({
  children,
  isEdit = false,
  initialData,
  onSuccess,
}: AnnouncementProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="flex flex-col sm:max-w-[600px] p-0 gap-0">
        <AnnouncementForm
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

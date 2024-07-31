"use client";

import { ReactNode, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TraineeForm } from "./trainee-form";
import { DiscardChangesAlert } from "@/components/modals/discard-changes-modal";
import { z } from "zod";

export type TraineeFormInitialData = {
  branch: string;
  fullName: string;
  mobileNumber: string;
  attendType: string;
  preferredSlot?: string;
  secondPreferredSlot?: string;
  ageGroup?: "adult" | "teen";
  level?: string;
  paymentType?: string;
  paidValue?: string;
  paymentRemainingValue?: string;
  notes?: string;

  birthDate?: Date;
  country?: string;
  city?: string;
  email?: string;
  education?: string;
  job?: string;
  preferredDayForTest?: string;
  preferredTimeForTest?: string;
  followUpUser?: any
};

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isEdit?: boolean;
  initialData?: {
    id: string;
    formData: TraineeFormInitialData;
  };
  onSuccess?: () => void;

}

export function TraineeModal({
  children,
  isEdit = false,
  initialData,
  onSuccess,

}: UserFormProps) {
  const [open, setOpen] = useState(false);
  const [isDiscardOpen, setIsDiscardOpen] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (value) {
            setOpen(true);
          } else {
            setIsDiscardOpen(true);
          }
        }}
      >
        {children}

        <DialogContent className="flex flex-col sm:max-w-[600px] p-0 h-4/5 gap-0">
          <TraineeForm
            isEdit={isEdit}
            initialData={initialData}
            onSuccess={() => {
              setOpen(false);
              // onSuccess?.();
            }}
          />
        </DialogContent>
      </Dialog>

      <DiscardChangesAlert
        onDiscard={() => {
          setIsDiscardOpen(false);
          setOpen(false);
        }}
        open={isDiscardOpen}
        onOpenChange={setIsDiscardOpen}
      />
    </>
  );
}

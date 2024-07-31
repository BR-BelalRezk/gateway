"use client";

import * as z from "zod";
import { ReactNode, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { UserForm } from "./user-form";

const userFormSchema = z.object({
  username: z
    .string({
      required_error: "Please enter the username.",
    })
    .min(1),
  email: z
    .string({
      required_error: "Please enter the email.",
    })
    .email(),
  role: z.string({
    required_error: "Please select the role.",
  }),
  branch: z.string({
    required_error: "Please select the branch.",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isEdit?: boolean;
  initialData?: {
    id: string;
    formData: UserFormValues;
  };
  onSuccess?: () => void;
}

export function UserModal({
  children,
  isEdit = false,
  initialData,
  onSuccess,
}: UserFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}

      <DialogContent className="sm:max-w-[600px] p-0">
        <UserForm
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

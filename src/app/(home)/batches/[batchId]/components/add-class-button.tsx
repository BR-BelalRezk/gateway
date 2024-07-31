"use client";

import { ClassModal } from "@/components/modals/class-modal";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const AddClassButton = ({ activeBatch }: { activeBatch: string }) => {
  const router = useRouter();

  return (
    <ClassModal
      initialData={{
        formData: {
          batch: activeBatch,
        },
      }}
      onSuccess={() => {
        router.refresh();
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-md">
          Add Class
        </Button>
      </DialogTrigger>
    </ClassModal>
  );
};

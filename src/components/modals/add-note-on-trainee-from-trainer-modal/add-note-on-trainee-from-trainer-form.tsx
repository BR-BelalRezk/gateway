"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createNote } from "@/app/(home)/(dashboard)/actions";
import { useRouter } from "next/navigation";
import { addTrainerNotes } from "@/app/(home)/batches/actions";

const addNoteOnTraineeFromTrainerSchema = z.object({
  note: z.string({
    required_error: "Please enter the note.",
  }),
});

export type AddNoteOnTraineeFromTrainerValues = z.infer<typeof addNoteOnTraineeFromTrainerSchema>;

interface AddNoteOnTraineeFromTrainerProps extends React.HTMLAttributes<HTMLDivElement> {
  classId: string;
  isAdminNotes: boolean;
  traineeId: string;
  onSuccess?: () => void;
  initialData?: {
    formData: Partial<AddNoteOnTraineeFromTrainerValues>;
  };
}

export function AddNoteOnTraineeFromTrainer({
  classId,
  isAdminNotes,
  traineeId,
  initialData,
  onSuccess,
}: AddNoteOnTraineeFromTrainerProps) {
  const { toast } = useToast();

  const errorMessages: {
    [key: string]: { title: string; description: string | null };
  } = useMemo(
    () => ({
      // Don't leak information about whether an email is registered or not
      ["unauthenticated"]: {
        title: "Username or password is incorrect.",
        description: null,
      },
      ["unauthorized"]: {
        title: "Username or password is incorrect.",
        description: null,
      },
      ["old-password-is-incorrect"]: {
        title: "Old password is incorrect.",
        description: "Your request failed. Please try again.",
      },
      ["internal-server-error"]: {
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
      },
    }),
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddNoteOnTraineeFromTrainerValues>({
    resolver: zodResolver(addNoteOnTraineeFromTrainerSchema),
    defaultValues: initialData?.formData,
    mode: "onTouched",
  });
  const router = useRouter();
  async function onSubmit(data: AddNoteOnTraineeFromTrainerValues) {
    setIsLoading(true);

    const response = addTrainerNotes({
      classId:classId,
      note: data.note,
      traineeId:traineeId,
      isAdminNotes:isAdminNotes
    })

    setIsLoading(false);

    // if (!response.ok) {
    //   const error = response.error
    //     ? errorMessages[response.error] ||
    //       errorMessages["internal-server-error"]
    //     : errorMessages["internal-server-error"];

    //   return toast({
    //     title: error.title,
    //     description: error.description,
    //     variant: "destructive",
    //   });
    // }

    onSuccess?.();
    toast({
      title: "Action Done successfully",
      variant: "success",
    });
    router.refresh()
  }

  return (
    <>
      <DialogHeader className="px-6 py-6 border-b">
        <DialogTitle>
        Note to Trainer
          </DialogTitle>
        <DialogDescription>
          Leave not for this trainee to the trainer
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        <div className="overflow-auto">
          <div className="flex flex-col gap-6 py-4 px-6">
            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="note"
                className={cn(errors.note ? "text-destructive" : "")}
              >
                Note
              </Label>
              <Input
                id="note"
                type="text"
                autoComplete="off"
                disabled={isLoading}
                {...register("note")}
              />
              {errors.note ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.note.message}
                </p>
              ) : null}
            </div>

          </div>
        </div>
        <DialogFooter className="px-6 py-6 border-t">
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Done
            </Button>
        </DialogFooter>
      </form>
    </>
  );
}

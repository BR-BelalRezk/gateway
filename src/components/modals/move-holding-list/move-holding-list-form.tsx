"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { Textarea } from "@/components/ui/textarea";
import { assignLevel, getLevels } from "@/app/(home)/pending-test/actions";
import { ComboBox } from "@/components/ui/combobox";
import { MoveToHoldingList } from "@/app/(home)/hold-list/actions";

const assignLevelFormSchema = z.object({
  notes: z.string(),
});

export type MoveToHoldingListFormValues = z.infer<typeof assignLevelFormSchema>;

interface MoveToHoldingListFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  traineeIds: string[];
  initialData?: MoveToHoldingListFormValues;
}

export function MoveToHoldingListForm({
  traineeIds,
  initialData,
  onSuccess,
}: MoveToHoldingListFormProps) {
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<MoveToHoldingListFormValues>({
    resolver: zodResolver(assignLevelFormSchema),
    defaultValues: initialData,
    mode: "onTouched",
  });

  async function onSubmit(data: MoveToHoldingListFormValues) {
    //console.log("@@E#@")
    // //console.log(traineeId)
    setIsLoading(true);
    const response = await MoveToHoldingList({
      traineeIds: traineeIds,
      notes: data.notes,
    });
    
    setIsLoading(false);

    if (!response.ok) {
      const error = response.error
        ? errorMessages[response.error] ||
          errorMessages["internal-server-error"]
        : errorMessages["internal-server-error"];

      return toast({
        title: error.title,
        description: error.description,
        variant: "destructive",
      });
    }

    onSuccess?.();

    toast({
      title: "Action Done successfully",
      variant: "success",
    });
  }

  return (
    <>
      <DialogHeader className="px-6 py-6 border-b">
        <DialogTitle>Hold Trainee</DialogTitle>
        <DialogDescription>Add Trainee to Holding list</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        <div className="overflow-auto">
          <div className="flex flex-col gap-6 py-4 px-6">
            

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="notes"
                className={cn(errors.notes ? "text-destructive" : "")}
              >
                Notes
              </Label>
              <Textarea
                id="notes"
                autoComplete="off"
                disabled={isLoading}
                {...register("notes")}
              />
              {errors.notes ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.notes.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-6 border-t">
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Hold
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

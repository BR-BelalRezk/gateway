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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { addSessionNotes, getBranchClassesById } from "@/app/(home)/batches/actions";
import { ComboBox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

const addNotesToAttendanceFormSchema = z.object({
  session: z.string({
    required_error: "Please select the session.",
  }),
  
  note: z.string({
    required_error: "Please write notes.",
  }),
  
});

export type AddNotesToAttendanceFormValues = z.infer<
  typeof addNotesToAttendanceFormSchema
>;

interface AddNotesToAttendanceFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  traineeId: string;
  classId: string;
  attendance?: any;
  initialData?: AddNotesToAttendanceFormValues;
}



export function AddNotesToAttendanceForm({
  traineeId,
  classId,
  attendance,
  onSuccess,
}: AddNotesToAttendanceFormProps) {
  const { toast } = useToast();

  const sessions = [
    {
      value: "1",
      label: "Session 1"
    },
    {
      value: "2",
      label: "Session 2"
    },
    {
      value: "3",
      label: "Session 3"
    },
    {
      value: "4",
      label: "Session 4"
    },
    {
      value: "5",
      label: "Session 5"
    },
    {
      value: "6",
      label: "Session 6"
    },
    {
      value: "7",
      label: "Session 7"
    },
    {
      value: "8",
      label: "Session 8"
    }
  ]

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
    formState: { errors },
  } = useForm<AddNotesToAttendanceFormValues>({
    resolver: zodResolver(addNotesToAttendanceFormSchema),
    mode: "onTouched",
  });


  async function onSubmit(data: AddNotesToAttendanceFormValues) {
    setIsLoading(true);

    const response = await addSessionNotes({
      classId: classId,
      traineeId: traineeId,
      dayNumber: data.session,
      note: data.note
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
        <DialogTitle>Add Attendance Notes </DialogTitle>
        {/* <DialogDescription>Assign class to Trainee</DialogDescription> */}
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        <div className="overflow-auto">
          <div className="flex flex-col gap-6 py-4 px-6">
            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="session"
                className={cn(errors.session ? "text-destructive" : "")}
              >
                Session
              </Label>
              <Controller
                control={control}
                name="session"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="session"
                    options={sessions}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No session found."
                    placeholder="Search session..."
                    inputEmptyValue="Select session"
                  />
                )}
              />

              {errors.session ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.session.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-6 py-4 px-6">
            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="note"
                className={cn(errors.note ? "text-destructive" : "")}
              >
                Notes
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
            Add
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

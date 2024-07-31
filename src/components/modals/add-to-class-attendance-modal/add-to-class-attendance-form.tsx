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
import { addToClassAttendance } from "@/app/(home)/pending-test/actions";
import { getBranchClassesById } from "@/app/(home)/batches/actions";
import { ComboBox } from "@/components/ui/combobox";

const addToClassAttendanceFormSchema = z.object({
  classId: z.string({
    required_error: "Please select the trainer.",
  }),
});

export type AddToClassAttendanceFormValues = z.infer<
  typeof addToClassAttendanceFormSchema
>;

interface AddToClassAttendanceFormProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  traineeId: string;
  branchId: string;
  initialData?: AddToClassAttendanceFormValues;
}

export function AddToClassAttendanceForm({
  traineeId,
  branchId,
  initialData,
  onSuccess,
}: AddToClassAttendanceFormProps) {
  const { toast } = useToast();

  const [classes, setClasses] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadClasses = async () => {
      const loadedClasses = await getBranchClassesById(branchId);
      setClasses(
        loadedClasses
          ? loadedClasses.map((classData) => ({
              value: classData.id.toString(),
              label: classData.name,
            }))
          : []
      );
    };

    loadClasses();
  }, [branchId]);

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
    formState: { errors },
  } = useForm<AddToClassAttendanceFormValues>({
    resolver: zodResolver(addToClassAttendanceFormSchema),
    defaultValues: initialData,
    mode: "onTouched",
  });

  async function onSubmit(data: AddToClassAttendanceFormValues) {
    setIsLoading(true);

    const response = await addToClassAttendance({
      traineeId: traineeId,
      classId: data.classId,
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
      title: "Trainee created successfully",
      variant: "success",
    });
  }

  return (
    <>
      <DialogHeader className="px-6 py-6 border-b">
        <DialogTitle>Add Trainee To Class Attendance</DialogTitle>
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
                htmlFor="classId"
                className={cn(errors.classId ? "text-destructive" : "")}
              >
                Class
              </Label>
              <Controller
                control={control}
                name="classId"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="classId"
                    options={classes}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No class found."
                    placeholder="Search class..."
                    inputEmptyValue="Select class"
                  />
                )}
              />

              {errors.classId ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.classId.message}
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

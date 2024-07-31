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
import { assignTrainer, getTrainers } from "@/app/(home)/pending-test/actions";
import { useTimepickerOptions } from "@/lib/timepicker";
import { DatePicker } from "@/components/ui/date-picker";
import { ComboBox } from "@/components/ui/combobox";

const assignTrainerFormSchema = z.object({
  trainer: z.string({
    required_error: "Please select the trainer.",
  }),
  testDate: z.date({
    required_error: "Please enter the trainee's test date.",
  }),
  testTime: z.string({
    required_error: "Please enter the trainee's test date.",
  }),
});

export type AssignTrainerFormValues = z.infer<typeof assignTrainerFormSchema>;

interface AssignTrainerFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  traineeIds: string[];
  initialData?: AssignTrainerFormValues;
}

export function AssignTrainerForm({
  traineeIds,
  initialData,
  onSuccess,
}: AssignTrainerFormProps) {
  const { toast } = useToast();

  const [trainers, setTrainers] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTrainers = async () => {
      const loadedTrainers = await getTrainers();
      setTrainers(loadedTrainers);
    };

    loadTrainers();
  }, []);

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

  const timeOptions = useTimepickerOptions({ minuteStep: 15 });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignTrainerFormValues>({
    resolver: zodResolver(assignTrainerFormSchema),
    defaultValues: initialData,
    mode: "onTouched",
  });

  async function onSubmit(data: AssignTrainerFormValues) {
    setIsLoading(true);

    ////console.log("DSSDSDSDS", data);

    const date = data.testDate;

    const [hours, minutes, seconds] = data.testTime.split(":").map(Number);

    // Set the hours, minutes, and seconds of the Date object
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    //console.log("just before assign trainer", date.toISOString())
    //console.log(traineeIds)
    const response = await assignTrainer({
      traineeIds: traineeIds,
      trainerId: data.trainer,
      date: date.toISOString(),
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
        <DialogTitle>Assign Trainer</DialogTitle>
        <DialogDescription>Assign trainer to Trainee</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        <div className="overflow-auto">
          <div className="flex flex-col gap-6 py-4 px-6">
            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="trainer"
                className={cn(errors.trainer ? "text-destructive" : "")}
              >
                Trainer
              </Label>
              <Controller
                control={control}
                name="trainer"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="trainer"
                    options={trainers}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No class found."
                    placeholder="Search class..."
                    inputEmptyValue="Select class"
                  />
                )}
              />
              
              {errors.trainer ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.trainer.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="testDate"
                className={cn(errors.testDate ? "text-destructive" : "")}
              >
                Test Date
              </Label>
              <Controller
                control={control}
                name="testDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker id="testDate" value={value} onChange={onChange} />
                )}
              />

              {errors.testDate ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.testDate.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="testTime"
                className={cn(errors.testTime ? "text-destructive" : "")}
              >
                What is your preferable time for test
              </Label>
              <Controller
                control={control}
                name="testTime"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="testTime"
                    options={timeOptions}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No time found."
                    placeholder="Search time..."
                    inputEmptyValue="Select time"
                  />
                )}
              />

              {errors.testTime ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.testTime.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-6 border-t">
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Trainer
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

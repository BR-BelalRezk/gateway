"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { createBatch, updateBatch } from "@/app/(home)/batches/actions";
import { DatePicker } from "@/components/ui/date-picker";

const batchFormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the trainee's name.",
    })
    .min(1),
  startDate: z
    .date({
      required_error: "Please enter the trainee's birth date.",
    })
    .optional(),
  endDate: z
    .date({
      required_error: "Please enter the trainee's birth date.",
    })
    .optional(),
  branch: z.string({
    required_error: "Please select the city.",
  }),
});

export type BatchFormValues = z.infer<typeof batchFormSchema>;

interface BatchFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    formData: Partial<BatchFormValues>;
  };
}

export function BatchForm({
  isEdit = false,
  initialData,
  onSuccess,
}: BatchFormProps) {
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
  } = useForm<BatchFormValues>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: initialData?.formData,
    mode: "onTouched",
  });

  async function onSubmit(data: BatchFormValues) {
    setIsLoading(true);

    const response = isEdit
      ? await updateBatch({
          id: initialData!.id!,
          name: data.name,
          startDate: data.startDate?.toISOString(),
          endDate: data.endDate?.toISOString(),
          branchId: data.branch,
        })
      : await createBatch({
          name: data.name,
          startDate: data.startDate?.toISOString(),
          endDate: data.endDate?.toISOString(),
          branchId: data.branch,
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
        <DialogTitle>{isEdit ? "Edit Batch" : "Add Batch"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update batch info in the system"
            : "Add Batch to the system"}
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
                htmlFor="name"
                className={cn(errors.name ? "text-destructive" : "")}
              >
                Title
              </Label>
              <Input
                id="name"
                type="text"
                autoComplete="off"
                disabled={isLoading}
                {...register("name")}
              />
              {errors.name ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="startDate"
                className={cn(errors.startDate ? "text-destructive" : "")}
              >
                Start Date
              </Label>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    id="startDate"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              {errors.startDate ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.startDate.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="endDate"
                className={cn(errors.endDate ? "text-destructive" : "")}
              >
                End Date
              </Label>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker id="endDate" value={value} onChange={onChange} />
                )}
              />

              {errors.endDate ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.endDate.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-6 border-t">
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {isEdit ? "Edit Batch" : "Create Batch"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

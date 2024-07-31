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
import { switchClass } from "@/app/(home)/pending-test/actions";
import { getBranchClassesById } from "@/app/(home)/batches/actions";
import { ComboBox } from "@/components/ui/combobox";
import { getTypes } from "@/app/(home)/users/actions";

const switchClassFormSchema = z.object({
  type: z.string({
    required_error: "Please enter the trainee's birth date.",
  }),
  classId: z.string({
    required_error: "Please select the trainer.",
  }),
});

export type SwitchClassFormValues = z.infer<typeof switchClassFormSchema>;

interface SwitchClassFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  traineeId: string;
  branchId: string;
  initialData?: SwitchClassFormValues;
}

export function SwitchClassForm({
  traineeId,
  branchId,
  initialData,
  onSuccess,
}: SwitchClassFormProps) {
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SwitchClassFormValues>({
    resolver: zodResolver(switchClassFormSchema),
    defaultValues: initialData,
    mode: "onTouched",
  });

  const [types, setTypes] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTypes = async () => {
      const loadedTypes = await getTypes();
      setTypes(loadedTypes);
    };
    //console.log("IAM IN")

    loadTypes();
  }, [branchId]);

  // dynamic city options handling
  const [isClassesLoading, setIsClassesLoading] = useState(true);
  const [classes, setClasses] = useState<FilterPossibleValues>([]);

  const selectedType = watch("type");
  const selectedClass = watch("classId");

  useEffect(() => {
    const updateCities = async () => {
      //console.log("IAM IN")

      if (!selectedType) {
        setClasses([]);
        setValue("classId", "");
        return;
      }
      //console.log("IAM IN")
      setIsClassesLoading(true);
      //console.log("loadedClasses");
      const loadedClasses = await getBranchClassesById(branchId);
      //console.log(loadedClasses);
      //console.log("loadedClasses");
      const classesOptions = loadedClasses
        ? loadedClasses
            .filter(
              (classData) => classData.type.id.toString() === selectedType.toString()
            )
            .map((classData) => ({
              value: classData.id.toString(),
              label: classData.name,
            }))
        : [];

      setIsClassesLoading(false);
      //console.log(classesOptions);
      //console.log(selectedType);
      setClasses(classesOptions);

      if (!classesOptions.some((c) => c.value == selectedClass)) {
        setValue("classId", "");
      }
    };

    updateCities();
  }, [selectedType, selectedClass, setValue]);

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

  async function onSubmit(data: SwitchClassFormValues) {
    setIsLoading(true);

    const response = await switchClass({
      traineeIds: [traineeId],
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
      title: "Action Done successfully",
      variant: "success",
    });
  }

  return (
    <>
      <DialogHeader className="px-6 py-6 border-b">
        <DialogTitle>Switch Class</DialogTitle>
        <DialogDescription>Switch trainee class</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden"
      >
        <div className="overflow-auto">
          <div className="flex flex-col gap-6 py-4 px-6">
            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="type"
                className={cn(errors.type ? "text-destructive" : "")}
              >
                Class Type
              </Label>
              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="type"
                    options={types}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No type found."
                    placeholder="Search type..."
                    inputEmptyValue="Select type"
                  />
                )}
              />

              {errors.type ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.type.message}
                </p>
              ) : null}
            </div>

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
                    isDisabled={isClassesLoading}
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
            Assign Class
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

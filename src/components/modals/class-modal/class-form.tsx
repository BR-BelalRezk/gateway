"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { createClass, updateClass } from "@/app/(home)/batches/actions";
import { getRooms, getTypes } from "@/app/(home)/users/actions";
import {
  getLevels,
  getTimeSlots,
  getTrainers,
} from "@/app/(home)/pending-test/actions";
import { ComboBox } from "@/components/ui/combobox";

const classFormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter the trainee's name.",
    })
    .min(1),
  type: z.string({
    required_error: "Please enter the trainee's birth date.",
  }),
  batch: z.string({
    required_error: "Please enter the trainee's birth date.",
  }),
  room: z.string({
    required_error: "Please select the city.",
  }),
  timeSlot: z.string({
    required_error: "Please select the city.",
  }),
  trainer: z.string({
    required_error: "Please select the city.",
  }),
  level: z.string({
    required_error: "Please select the level.",
  }),
});

export type ClassFormValues = z.infer<typeof classFormSchema>;

interface ClassFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  isEdit?: boolean;
  initialData?: {
    id?: string;
    formData: Partial<ClassFormValues>;
  };
}

export function ClassForm({
  isEdit = false,
  initialData,
  onSuccess,
}: ClassFormProps) {
  const { toast } = useToast();

  const [types, setTypes] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTypes = async () => {
      const loadedTypes = await getTypes();
      setTypes(loadedTypes);
    };

    loadTypes();
  }, []);

  const [rooms, setRooms] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadRooms = async () => {
      const loadedRooms = await getRooms();
      setRooms(
        loadedRooms.map((room) => ({
          value: room.id.toString(),
          label: room.name,
        }))
      );
    };

    loadRooms();
  }, []);

  const [timeSlots, setTimeSlots] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTimeSlots = async () => {
      const loadedTimeSlots = await getTimeSlots();
      setTimeSlots(loadedTimeSlots);
    };

    loadTimeSlots();
  }, []);

  const [trainers, setTrainers] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTrainers = async () => {
      const loadedTrainers = await getTrainers();
      setTrainers(loadedTrainers);
    };

    loadTrainers();
  }, []);

  const [levels, setLevels] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadLevels = async () => {
      const loadedLevels = await getLevels();
      setLevels(loadedLevels);
    };

    loadLevels();
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

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: initialData?.formData,
    mode: "onTouched",
  });

  async function onSubmit(data: ClassFormValues) {
    setIsLoading(true);

    const response = isEdit
      ? await updateClass({
          id: initialData!.id!,
          name: data.name,
          typeId: data.type,
          batchId: data.batch,
          roomId: data.room,
          timeSlotId: data.timeSlot,
          dayNumber: "0",
          trainerId: data.trainer,
          levelId: data.level,
        })
      : await createClass({
          name: data.name,
          typeId: data.type,
          batchId: data.batch,
          roomId: data.room,
          timeSlotId: data.timeSlot,
          dayNumber: "0",
          trainerId: data.trainer,
          levelId: data.level,
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
        <DialogTitle>{isEdit ? "Edit Class" : "Add Class"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update class info in the system"
            : "Add Class to the system"}
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
                Name
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
                htmlFor="room"
                className={cn(errors.room ? "text-destructive" : "")}
              >
                Room
              </Label>
              <Controller
                control={control}
                name="room"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="room"
                    options={rooms}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No room found."
                    placeholder="Search room..."
                    inputEmptyValue="Select room"
                  />
                )}
              />

              {errors.room ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.room.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="timeSlot"
                className={cn(errors.timeSlot ? "text-destructive" : "")}
              >
                Time Slot
              </Label>
              <Controller
                control={control}
                name="timeSlot"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="timeSlot"
                    options={timeSlots}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No time slot found."
                    placeholder="Search time slot..."
                    inputEmptyValue="Select time slot"
                  />
                )}
              />

              {errors.timeSlot ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.timeSlot.message}
                </p>
              ) : null}
            </div>

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
                    emptyText="No trainer found."
                    placeholder="Search trainer..."
                    inputEmptyValue="Select trainer"
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
                htmlFor="level"
                className={cn(errors.level ? "text-destructive" : "")}
              >
                Level
              </Label>
              <Controller
                control={control}
                name="level"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="level"
                    options={levels}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No level found."
                    placeholder="Search level..."
                    inputEmptyValue="Select level"
                  />
                )}
              />

              {errors.level ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.level.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 py-6 border-t">
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {isEdit ? "Edit Class" : "Create Class"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

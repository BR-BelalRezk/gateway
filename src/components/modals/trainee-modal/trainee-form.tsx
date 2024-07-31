"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilterPossibleValues } from "@/types/columns";
import { Textarea } from "@/components/ui/textarea";
import { attendTypes } from "@/consts/attend-types";
import { days } from "@/consts/days";
import {
  createTrainee,
  getCities,
  getCountries,
  getLevels,
  getTimeSlots,
  getUsersOptions,
  updateTrainee,
} from "@/app/(home)/pending-test/actions";
import { paymentTypes } from "@/consts/payment-types";
import { useTimepickerOptions } from "@/lib/timepicker";
import { ComboBox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { TraineeFormInitialData } from "@/components/modals/trainee-modal";
import { useRouter } from "next/navigation";
import { ageGroups } from "@/consts/age-groups";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getBranches } from "@/app/(home)/users/actions";
import { useUser } from "@/providers/user";

const traineeFormSchema = z.object({
  // main section
  branch: z
    .string({ required_error: "Please select the branch." })
    .min(1, { message: "Please select the branch" }),
  fullName: z
    .string({
      required_error: "Please enter the trainee's name.",
    })
    .min(1, { message: "Please enter the trainee's name." }),
  mobileNumber: z
    .string({
      required_error: "Please enter the trainee's mobile number.",
    })
    .min(1, { message: "Please enter the trainee's mobile number." }),
  attendType: z.string().nullable(),
  preferredSlot: z.string().optional(),
  ageGroup: z.enum(["adult", "teen"]).optional(),
  country: z.string({required_error:"Please enter the trainee's country."}).min(1, { message: "Please enter the trainee's country."}),
  level: z.string().optional(),
  paymentType: z.string().optional(),
  paidValue: z.string().optional(),
  paymentRemainingValue: z.string().optional(),
  notes: z.string().optional(),

  // advanced section
  birthDate: z.date().optional(),
  city: z.string().optional(),
  education: z.string().optional(),
  email: z.string().optional().nullable(),
  job: z.string().optional(),
  tester: z.string().optional(),

  secondPreferredSlot: z.string().optional(),
  preferredDayForTest: z.string().optional(),
  preferredTimeForTest: z.string().optional(),

  followUpUser: z.array(z.string()).optional(),
});

export type TraineeFormValues = z.infer<typeof traineeFormSchema>;

interface TraineeFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  isEdit?: boolean;
  initialData?: {
    id: string;
    formData: TraineeFormInitialData;
  };
}

export function TraineeForm({ isEdit = false, initialData, onSuccess }: TraineeFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { user } = useUser();

  const [branches, setBranches] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadBranches = async () => {
      const loadedBranches = await getBranches();
      setBranches(loadedBranches.filter((branch) => branch.label !== "HQ"));
    };

    loadBranches();
  }, []);

  const [countries, setCountries] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadCountries = async () => {
      const loadedCountries = await getCountries();
      setCountries(loadedCountries);
    };

    loadCountries();
  }, []);

  const [timeSlots, setTimeSlots] = useState<FilterPossibleValues>([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTimeSlots = async () => {
      const loadedTimeSlots = await getTimeSlots();
      setTimeSlots(loadedTimeSlots);
    };

    loadTimeSlots();
  }, []);

  const [levels, setLevels] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadLevels = async () => {
      const loadedLevels = await getLevels();
      setLevels(loadedLevels);
    };

    loadLevels();
  }, []);

  const [users, setUsers] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadUsers = async () => {
      const loadedUsers = await getUsersOptions();
      setUsers(loadedUsers);
    };
    //console.log(initialData)
    loadUsers();
  }, [user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const timeOptions = useTimepickerOptions({ minuteStep: 15 });

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TraineeFormValues>({
    resolver: zodResolver(traineeFormSchema),
    defaultValues: isEdit
      ? initialData!.formData
      : {
          fullName: "",
          branch: user?.branchId === "4" ? "" : user?.branchId,
        },
    mode: "onTouched",
  });

  // capitalize full name
  const fullName = watch("fullName");
  useEffect(() => {
    setValue(
      "fullName",
      fullName.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      })
    );
  }, [fullName, setValue]);

  // dynamic city options handling
  const [isCitiesLoading, setIsCitiesLoading] = useState(true);
  const [cities, setCities] = useState<FilterPossibleValues>([]);
  const [selectedAttendType, setSelectedAttendType] = useState<string>("");
  const selectedCountry = watch("country");
  const selectedCity = watch("city");

  useEffect(() => {
    const updateCities = async () => {
      if (!selectedCountry) {
        setCities([]);
        setValue("city", undefined);
        return;
      }

      setIsCitiesLoading(true);
      const newCities = await getCities(selectedCountry);

      setIsCitiesLoading(false);
      setCities(newCities);
      if (!newCities.some((c) => c.value == selectedCity)) {
        setValue("city", undefined);
      }
    };

    updateCities();
  }, [selectedCountry, selectedCity, setValue]);

  async function onSubmit(data: TraineeFormValues) {
    setIsLoading(true);

    const response = isEdit
      ? await updateTrainee({
          id: initialData!.id,
          fullName: data.fullName,
          birthdate: data.birthDate?.toISOString(),
          mobile: data.mobileNumber,
          email: data.email ?? "",
          typeOfGender: data.ageGroup ?? "adult" ,
          cityId: data.city ? data.city : undefined,
          preferredDayForTest: data.preferredDayForTest ?? undefined,
          startTimeForTest: data.preferredTimeForTest ?? undefined,
          branchId: data.branch,
          attendType: data.attendType ?? "",
          notes: data.notes,
          education: data.education,
          job: data.job,
          preferredSlotId: data.preferredSlot ?? undefined,
          secondPreferredSlotId: data.secondPreferredSlot ?? undefined,
          countryId: data.country,
          levelId: data.level ?? undefined,
          followUpUserId: data.followUpUser ?? undefined,
        })
      : await createTrainee({
          fullName: data.fullName,
          birthdate: data.birthDate?.toISOString(),
          mobile: data.mobileNumber,
          email: data.email ?? "",
          typeOfGender: data.ageGroup ?? "adult",
          cityId: data.city ? data.city : undefined,
          preferredDayForTest: data.preferredDayForTest
            ? data.preferredDayForTest
            : undefined,
          startTimeForTest: data.preferredTimeForTest
            ? data.preferredTimeForTest
            : undefined,
          branchId: data.branch,
          attendType: data.attendType ?? "", 
          notes: data.notes,
          education: data.education,
          job: data.job,
          preferredSlotId: data.preferredSlot ? data.preferredSlot : undefined,
          secondPreferredSlotId: data.secondPreferredSlot
            ? data.secondPreferredSlot
            : undefined,
          countryId: data.country,
          levelId: data.level ? data.level : undefined,
          paidType: data.paymentType ? data.paymentType : undefined,
          paidValue: data.paidValue ? data.paidValue : undefined,
          remainingValue: data.paymentRemainingValue
            ? data.paymentRemainingValue
            : undefined,
          followUpUserId: data.followUpUser ? data.followUpUser : undefined,
        });

    setIsLoading(false);

    if (!response.ok) {
      if (
        response.error === "unauthenticated" ||
        response.error === "unauthorized"
      ) {
        return toast({
          title: "Username or password is incorrect",
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();

    toast({
      title: "Action Done successfully",
      variant: "success",
    });

    onSuccess?.();
  }

  return (
    <>
      <DialogHeader className="px-6 py-6 border-b">
        <DialogTitle>{isEdit ? "Edit Trainee" : "Add Trainee"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update trainee info in the system"
            : "Add Trainees to the system"}
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
                htmlFor="branch"
                className={cn(errors.branch ? "text-destructive" : "")}
              >
                Branch
              </Label>
              <Controller
                control={control}
                name="branch"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="branch"
                    options={branches}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No branch found."
                    placeholder="Search branch..."
                    inputEmptyValue="Select branch"
                  />
                )}
              />

              {errors.branch ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.branch.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="fullName"
                className={cn(errors.fullName ? "text-destructive" : "")}
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                autoComplete="off"
                disabled={isLoading}
                {...register("fullName")}
              />
              {errors.fullName ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.fullName.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="mobileNumber"
                className={cn(errors.mobileNumber ? "text-destructive" : "")}
              >
                Mobile Number
              </Label>
              <Input
                id="mobileNumber"
                type="text"
                autoComplete="off"
                disabled={isLoading}
                {...register("mobileNumber")}
              />
              {errors.mobileNumber ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.mobileNumber.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="attendType"
                className={cn(errors.attendType ? "text-destructive" : "")}
              >
                Attend Type
              </Label>
              <Controller
                control={control}
                name="attendType"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="attendType"
                    options={attendTypes}
                    value={value + ""}
                    onChange={(value) => {
                      //console.log(value)
                      onChange(value);
                      setSelectedAttendType(value + "");
                      //console.log(timeSlots)
                      let x = timeSlots.filter(
                        (slot) => slot.type?.includes((value+""))
                      );
                      setFilteredTimeSlots(x)
                    }}
                    emptyText="No attendType found."
                    placeholder="Search attendType..."
                    inputEmptyValue="Select attendType"
                  />
                )}
              />

              {errors.attendType ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.attendType.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="preferredSlot"
                className={cn(errors.preferredSlot ? "text-destructive" : "")}
              >
                What is your preferable time of the course
              </Label>
              <Controller
                control={control}
                name="preferredSlot"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="preferredSlot"
                    options={filteredTimeSlots}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No timeSlot found."
                    placeholder="Search preferred slot..."
                    inputEmptyValue="Select preferred slot"
                  />
                )}
              />

              {errors.preferredSlot ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.preferredSlot.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="secondPreferredSlot"
                className={cn(
                  errors.secondPreferredSlot ? "text-destructive" : ""
                )}
              >
                What is your second preferable time of the course
              </Label>
              <Controller
                control={control}
                name="secondPreferredSlot"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="secondPreferredSlot"
                    options={timeSlots}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No timeSlot found."
                    placeholder="Search second preferred slot..."
                    inputEmptyValue="Select second preferred slot"
                  />
                )}
              />

              {errors.secondPreferredSlot ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.secondPreferredSlot.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Label
                htmlFor="ageGroup"
                className={cn(errors.ageGroup ? "text-destructive" : "")}
              >
                Age Group
              </Label>
              <Controller
                control={control}
                name="ageGroup"
                render={({ field: { onChange, value } }) => (
                  <ComboBox
                    id="ageGroup"
                    options={ageGroups}
                    value={value}
                    onChange={(value) => onChange(value)}
                    emptyText="No age group found."
                    placeholder="Search age group..."
                    inputEmptyValue="Select age group"
                  />
                )}
              />

              {errors.ageGroup ? (
                <p className={"text-sm font-medium text-destructive"}>
                  {errors.ageGroup.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="country"
                    className={cn(errors.country ? "text-destructive" : "")}
                  >
                    Country
                  </Label>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: { onChange, value } }) => (
                      <ComboBox
                        id="country"
                        options={countries}
                        value={value}
                        onChange={(value) => onChange(value)}
                        emptyText="No country found."
                        placeholder="Search country..."
                        inputEmptyValue="Select country"
                      />
                    )}
                  />

                  {errors.country ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.country.message}
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

            {!isEdit ? (
              <>
                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="paymentType"
                    className={cn(errors.paymentType ? "text-destructive" : "")}
                  >
                    Payment Type
                  </Label>
                  <Controller
                    control={control}
                    name="paymentType"
                    render={({ field: { onChange, value } }) => (
                      <ComboBox
                        id="paymentType"
                        options={paymentTypes}
                        value={value}
                        onChange={(value) => onChange(value)}
                        emptyText="No payment type found."
                        placeholder="Search payment type..."
                        inputEmptyValue="Select payment type"
                      />
                    )}
                  />

                  {errors.paymentType ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.paymentType.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="paidValue"
                    className={cn(errors.paidValue ? "text-destructive" : "")}
                  >
                    Paid Value
                  </Label>
                  <Input
                    id="paidValue"
                    type="text"
                    autoComplete="off"
                    disabled={isLoading}
                    {...register("paidValue")}
                  />
                  {errors.paidValue ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.paidValue.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="paymentRemainingValue"
                    className={cn(
                      errors.paymentRemainingValue ? "text-destructive" : ""
                    )}
                  >
                    Remaining Value
                  </Label>
                  <Input
                    id="paymentRemainingValue"
                    type="text"
                    autoComplete="off"
                    disabled={isLoading}
                    {...register("paymentRemainingValue")}
                  />
                  {errors.paymentRemainingValue ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.paymentRemainingValue.message}
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}

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

            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between py-4 w-full">
                <h4 className="text-sm font-semibold">Advanced Section</h4>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="flex flex-col gap-6">
                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="birthDate"
                    className={cn(errors.birthDate ? "text-destructive" : "")}
                  >
                    Date of birth
                  </Label>
                  <Controller
                    control={control}
                    name="birthDate"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        id="birthDate"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />

                  {errors.birthDate ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.birthDate.message}
                    </p>
                  ) : null}
                </div>

               

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="city"
                    className={cn(errors.city ? "text-destructive" : "")}
                  >
                    City
                  </Label>
                  <Controller
                    control={control}
                    name="city"
                    render={({ field: { onChange, value } }) => (
                      <ComboBox
                        id="city"
                        options={cities}
                        value={value}
                        onChange={(value) => onChange(value)}
                        emptyText="No city found."
                        placeholder="Search city..."
                        inputEmptyValue="Select city"
                        isDisabled={isCitiesLoading}
                      />
                    )}
                  />

                  {errors.city ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.city.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="email"
                    className={cn(errors.email ? "text-destructive" : "")}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="off"
                    disabled={isLoading}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="education"
                    className={cn(errors.education ? "text-destructive" : "")}
                  >
                    Education
                  </Label>
                  <Input
                    id="education"
                    type="text"
                    autoComplete="off"
                    disabled={isLoading}
                    {...register("education")}
                  />
                  {errors.education ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.education.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="job"
                    className={cn(errors.job ? "text-destructive" : "")}
                  >
                    Job
                  </Label>
                  <Input
                    id="job"
                    type="text"
                    autoComplete="off"
                    disabled={isLoading}
                    {...register("job")}
                  />
                  {errors.job ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.job.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="preferredDayForTest"
                    className={cn(
                      errors.preferredDayForTest ? "text-destructive" : ""
                    )}
                  >
                    What is your preferable day for test
                  </Label>
                  <Controller
                    control={control}
                    name="preferredDayForTest"
                    render={({ field: { onChange, value } }) => (
                      <ComboBox
                        id="preferredDayForTest"
                        options={days}
                        value={value}
                        onChange={(value) => onChange(value)}
                        emptyText="No day found."
                        placeholder="Search day..."
                        inputEmptyValue="Select day"
                      />
                    )}
                  />

                  {errors.preferredDayForTest ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.preferredDayForTest.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="preferredTimeForTest"
                    className={cn(
                      errors.preferredTimeForTest ? "text-destructive" : ""
                    )}
                  >
                    What is your preferable time for test
                  </Label>
                  <Controller
                    control={control}
                    name="preferredTimeForTest"
                    render={({ field: { onChange, value } }) => (
                      <ComboBox
                        id="preferredTimeForTest"
                        options={timeOptions}
                        value={value}
                        onChange={(value) => onChange(value)}
                        emptyText="No time Option found."
                        placeholder="Search preferred time for test..."
                        inputEmptyValue="Select preferred time for test"
                      />
                    )}
                  />

                  {errors.preferredTimeForTest ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.preferredTimeForTest.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <Label
                    htmlFor="followUpUser"
                    className={cn(
                      errors.followUpUser ? "text-destructive" : ""
                    )}
                  >
                    Who should follow up
                  </Label>
                  <Controller
                    control={control}
                    name="followUpUser"
                    render={({ field: { onChange, value } }) => (
                      <ComboBox
                        id="followUpUser"
                        options={users}
                        value={value}
                        onChange={(value) => onChange(value)}
                        multiple={true}
                        emptyText="No user found."
                        placeholder="Search user..."
                        inputEmptyValue="Select user"
                      />
                    )}
                  />

                  {errors.followUpUser ? (
                    <p className={"text-sm font-medium text-destructive"}>
                      {errors.followUpUser?.message}
                    </p>
                  ) : null}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
        <DialogFooter className="px-6 py-6 border-t">
          <Button>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {isEdit ? "Edit Trainee" : "Create Trainee"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

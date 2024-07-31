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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  createUser,
  getBranches,
  getRoles,
  updateUser,
} from "@/app/(home)/users/actions";
import { FilterPossibleValues } from "@/types/columns";
import { ComboBox } from "@/components/ui/combobox";

const userFormSchema = z.object({
  username: z
    .string({
      required_error: "Please enter the username.",
    })
    .min(1),
  email: z
    .string({
      required_error: "Please enter the email.",
    })
    .email(),
    password: z
    .string({
      required_error: "Please enter the password.",
    }).optional(),
  role: z.string({
    required_error: "Please select the role.",
  }),
  branch: z.string({
    required_error: "Please select the branch.",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  isEdit?: boolean;
  initialData?: {
    id: string;
    formData: UserFormValues;
  };
}

export function UserForm({
  isEdit = false,
  initialData,
  onSuccess,
}: UserFormProps) {
  const { toast } = useToast();

  const [branches, setBranches] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadBranches = async () => {
      const loadedBranches = await getBranches();
      setBranches(loadedBranches);
    };

    loadBranches();
  }, []);

  const [roles, setRoles] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadRoles = async () => {
      const loadedRoles = await getRoles();
      setRoles(loadedRoles);
    };

    loadRoles();
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
      ["user_already_exists"]: {
        title: "User already exists!",
        description: "",
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
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: isEdit ? initialData!.formData : {},
    mode: "onTouched",
  });

  async function onSubmit(data: UserFormValues) {
    setIsLoading(true);

    const response = isEdit
      ? await updateUser({
          id: initialData!.id,
          username: data.username,
          email: data.email,
          role: data.role,
          branch: data.branch,
        })
      : await createUser({
          username: data.username,
          email: data.email,
          role: data.role,
          branch: data.branch,
          password: ""+data.password,
        });

    setIsLoading(false);

    if (!response.ok) {
      //console.log("response.error", response.error);

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
      title: "User created successfully",
      variant: "success",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <DialogHeader className="px-6 pt-6">
        <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
        <DialogDescription>
          {isEdit
            ? "Update user info in the system"
            : "Add Users to the system"}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="w-full px-6 py-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            <Label
              htmlFor="username"
              className={cn(errors.username ? "text-destructive" : "")}
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              autoComplete="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors.username ? (
              <p className={"text-sm font-medium text-destructive"}>
                {errors.username.message}
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
          {isEdit ? null : (
          <div className="flex flex-col items-start gap-2">
            <Label
              htmlFor="password"
              className={cn(errors.password ? "text-destructive" : "")}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password ? (
              <p className={"text-sm font-medium text-destructive"}>
                {errors.password.message}
              </p>
            ) : null}
          </div>
          )}
          <div className="flex flex-col items-start gap-2">
            <Label
              htmlFor="role"
              className={cn(errors.role ? "text-destructive" : "")}
            >
              Role
            </Label>
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <ComboBox
                  id="role"
                  options={roles}
                  value={value}
                  onChange={(value) => onChange(value)}
                  emptyText="No role found."
                  placeholder="Search role..."
                  inputEmptyValue="Select role"
                />
              )}
            />

            {errors.role ? (
              <p className={"text-sm font-medium text-destructive"}>
                {errors.role.message}
              </p>
            ) : null}
          </div>

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
        </div>
      </ScrollArea>
      <DialogFooter className="px-6 pb-6">
        <Button>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {isEdit ? "Edit User" : "Create User"}
        </Button>
      </DialogFooter>
    </form>
  );
}

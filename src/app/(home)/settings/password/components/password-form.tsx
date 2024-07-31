"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { updatePassword } from "@/app/(home)/settings/password/actions";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Please enter the current password.",
      })
      .min(8),
    newPassword: z
      .string({
        required_error: "Please enter the new password.",
      })
      .min(8),
    confirmPassword: z.string({
      required_error: "Please confirm the new password.",
    }),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    }
  );

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface PasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PasswordForm({}: PasswordFormProps) {
  const { toast } = useToast();
  //get variable from query param
  const searchParams = useSearchParams()
  let informed = false;
  useEffect(() => {
    const state = searchParams.get('state')
 if(state == 'first-signin' && !informed){
     toast({
       title: "You need to change your password on first login",
       variant: "destructive",
     });
    informed = true;
 }
  }, [searchParams]);

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
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    mode: "onTouched",
  });

  async function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);

    const response = await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
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
     signOut({ callbackUrl: '/signin' })
    

    toast({
      title: "Password updated successfully",
      variant: "success",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-2">
          <Label
            htmlFor="currentPassword"
            className={cn(errors.currentPassword ? "text-destructive" : "")}
          >
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            autoComplete="off"
            disabled={isLoading}
            {...register("currentPassword")}
          />
          {errors.currentPassword ? (
            <p className={"text-sm font-medium text-destructive"}>
              {errors.currentPassword.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label
            htmlFor="newPassword"
            className={cn(errors.newPassword ? "text-destructive" : "")}
          >
            New Password
          </Label>
          <Input
            id="newPassword"
            type="password"
            autoComplete="off"
            disabled={isLoading}
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className={"text-sm font-medium text-destructive"}>
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label
            htmlFor="confirmPassword"
            className={cn(errors.confirmPassword ? "text-destructive" : "")}
          >
            Repeat New Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="off"
            disabled={isLoading}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <p className={"text-sm font-medium text-destructive"}>
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Change password
      </Button>
    </form>
  );
}

"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { ErrorCode } from "@/lib/ErrorCode";
import { useMemo } from "react";
import { UserAuthFormData, userAuthSchema } from "@/app/(auth)/signin/schema";
import { GatewaySession } from "@/lib/auth";
import { useUser } from "@/providers/user";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit } = useForm<UserAuthFormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const { updateUser } = useUser();

  const errorMessages: {
    [key: string]: { title: string; description: string | null };
  } = useMemo(
    () => ({
      // Don't leak information about whether an email is registered or not
      [ErrorCode.IncorrectUsernamePassword]: {
        title: "Username or password is incorrect.",
        description: null,
      },
      [ErrorCode.InternalServerError]: {
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
      },
    }),
    []
  );

  async function onSubmit(data: UserAuthFormData) {
    setIsLoading(true);
    const callbackUrl = searchParams?.get("from") || "/";

    const signInResult = await signIn("credentials", {
      username: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: callbackUrl,
    });

    setIsLoading(false);

    if (!signInResult || signInResult.error) {
      const error = signInResult?.error
        ? errorMessages[signInResult.error] ||
          errorMessages[ErrorCode.InternalServerError]
        : errorMessages[ErrorCode.InternalServerError];

      return toast({
        title: error.title,
        description: error.description,
        variant: "destructive",
      });
    }

    const session = (await getSession()) as GatewaySession;

    updateUser(session.user!);
    router.replace(callbackUrl);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}

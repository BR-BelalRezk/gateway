"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { updateProfile } from "@/app/(home)/settings/profile/actions";
import { Loader2 } from "lucide-react";
import { useUser } from "@/providers/user";
import { useSession } from "next-auth/react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileForm({}: ProfileFormProps) {
  const { toast } = useToast();
  const { user, updateUser } = useUser();
  const { update } = useSession();

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = useMemo(
    () => ({
      username: user.name,
      email: user.email,
    }),
    [user.email, user.name]
  );

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
      ["internal-server-error"]: {
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
      },
    }),
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, register } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    const response = await updateProfile({
      username: data.username,
      email: data.email,
    });

    updateUser({
      name: data.username,
      email: data.email,
    })
    
    update({
      name: data.username,
      email: data.email,
    })

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

    toast({
      title: "User updated successfully",
      variant: "success",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-6">
        {/* <div className="flex flex-col items-start gap-2">
          <Label htmlFor="picture">Profile Picture</Label>
          <Input id="picture" type="file" accept="image/png, image/jpeg" />
        </div> */}

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            autoComplete="off"
            disabled={isLoading}
            {...register("username")}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            autoComplete="off"
            disabled={isLoading}
            {...register("email")}
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update profile
      </Button>
    </form>
  );
}

"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteNote } from "@/app/(home)/(dashboard)/actions";
import { useRouter } from "next/navigation";

interface DeleteAnnouncementAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  announcementId: string;
  children: ReactNode;
  onSuccess?: () => void;
}

export function DeleteAnnouncementAlert({
  announcementId: classId,
  children,
  onSuccess,
}: DeleteAnnouncementAlertProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
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

  async function onDelete() {
    setIsLoading(true);

    const response = await deleteNote(classId);

    setIsLoading(false);

    // if (!response.ok) {
    //   const error = response.error
    //     ? errorMessages[response.error] ||
    //       errorMessages["internal-server-error"]
    //     : errorMessages["internal-server-error"];

    //   return toast({
    //     title: error.title,
    //     description: error.description,
    //     variant: "destructive",
    //   });
    // }

    onSuccess?.();
    router.refresh();
    toast({
      title: "Done successfully",
      variant: "success",
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="text-black">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onDelete}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

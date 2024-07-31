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
import { deleteTrainee } from "@/app/(home)/pending-test/actions";
import { MoveToWaitingList } from "@/app/(home)/hold-list/actions";

interface MoveToWaitingListAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  traineeIds: string[];
  children: ReactNode;
  onSuccess?: () => void;
}

export function MoveToWaitingListAlert({
  traineeIds,
  children,
  onSuccess,
}: MoveToWaitingListAlertProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  async function onMove() {
    setIsLoading(true);
    //console.log(traineeIds)
    const response = await MoveToWaitingList({
      traineeIds: traineeIds,
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
      title: "User Moved successfully",
      variant: "success",
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>The user will be moved to the waiting list</AlertDialogTitle>
          <AlertDialogDescription>
            This trainee will be moved away from holding list and will be moved to the waiting list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="text-black">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onMove}>Move</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

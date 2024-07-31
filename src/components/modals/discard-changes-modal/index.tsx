"use client";

import { ReactNode, useState } from "react";
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

interface DiscardChangesAlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?(open: boolean): void;
  children?: ReactNode;
  onDiscard: () => void;
}

export function DiscardChangesAlert({
  open,
  onOpenChange,
  children,
  onDiscard,
}: DiscardChangesAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
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
            <Button
              onClick={onDiscard}
              className="bg-destructive hover:bg-red-600"
            >
              Discard
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

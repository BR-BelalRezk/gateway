"use client";

import { BatchWithClassCount } from "@/app/(home)/batches/schema";
import { BatchModal } from "@/components/modals/batch-modal";
import { DeleteBatchAlert } from "@/components/modals/delete-batch-modal";
import { EndBatchAlert } from "@/components/modals/end-batch-modal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const BatchCardActions = ({
  batch,
}: {
  batch: BatchWithClassCount;
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="relative sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <BatchModal
          isEdit
          initialData={{
            id: batch.batch.id.toString(),
            formData: {
              name: batch.batch.name,
              startDate: batch.batch.startDate
                ? new Date(batch.batch.startDate)
                : undefined,
              endDate: batch.batch.endDate
                ? new Date(batch.batch.endDate)
                : undefined,
              branch: batch.batch.branchId.toString(),
            },
          }}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
        </BatchModal>

        <EndBatchAlert
          batchId={batch.batch.id.toString()}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              End Batch
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </EndBatchAlert>

        <DropdownMenuSeparator />
        <DeleteBatchAlert
          batchId={batch.batch.id.toString()}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DeleteBatchAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

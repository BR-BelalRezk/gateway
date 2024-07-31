"use client";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogTrigger } from "../ui/alert-dialog";
import { DeleteTraineeAlert } from "../modals/delete-trainee-modal";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/user";
import { DeleteIcon, TrashIcon } from "lucide-react";

interface DataTableDeleteProps<TData> {
  table: Table<TData>;
}

export function DataTableDelete<TData>({
  table,
}: DataTableDeleteProps<TData>) {
  const router = useRouter();
  const { user } = useUser();
  
  return (

    <DeleteTraineeAlert
    traineeId={user.id.toString()}
    onSuccess={() => {
      router.refresh();
    }}
  >
    <AlertDialogTrigger asChild>
    <Button variant="outline" size="sm" className="flex ml-auto h-8">
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </Button>
    </AlertDialogTrigger>
  </DeleteTraineeAlert>


  );
}

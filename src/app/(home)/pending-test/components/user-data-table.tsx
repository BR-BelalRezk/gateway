"use client";

import { getPendingTestTrainees } from "@/app/(home)/pending-test/actions";
import { columns } from "@/app/(home)/pending-test/components/columns";
import { DataTableInfiniteLoading } from "@/components/data-table/data-table";
import { AssignTrainerModal } from "@/components/modals/assign-trainer-modal";
import { DeleteTraineeAlert } from "@/components/modals/delete-trainee-modal";
import { DeleteTraineesAlert } from "@/components/modals/delete-trainees-modal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUser } from "@/providers/user";
import { DeleteIcon, TrashIcon, UserIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export function PendingTestDataTable({
  data: initialData,
  total: initialTotal,
}: {
  data: any[];
  total: number;
}) {
  const { user } = useUser();

  const canViewAllBranches = user?.branchId === "4";
  const canViewAllTrainers = user?.role !== "Trainer";

  const searchParams = useSearchParams();

  const searchValue = searchParams.get("q");
  const branchFilter = searchParams.get("branch");
  const attendTypeFilter = searchParams.get("attendType");
  const assignedTrainerFilter = searchParams.get("assignedTrainer");

  const [data, setData] = useState<{ total: number; trainees: any[] }>({
    total: initialTotal,
    trainees: initialData,
  });

  useEffect(() => {
    setData({
      total: initialTotal,
      trainees: initialData,
    });
  }, [initialData, initialTotal]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const router = useRouter();

  const columnsMemo = useMemo(
    () => columns({ canViewAllBranches, canViewAllTrainers }),
    [canViewAllBranches, canViewAllTrainers]
  );

  const onLoadMore = useCallback(() => {
    if (isLoading) return null;

    setIsLoading(true);
    getPendingTestTrainees({
      page: data.trainees.length / 10 + 1,
      keyword: searchValue ?? undefined,
      branchesIds: branchFilter ? branchFilter.split(",") : undefined,
      attendTypes: attendTypeFilter ? attendTypeFilter.split(",") : undefined,
      assignedTrainers: assignedTrainerFilter
        ? assignedTrainerFilter.split(",")
        : undefined,
    }).then((res) => {
      setData((data) => ({
        total: res.total,
        trainees: [...data.trainees, ...res.trainees],
      }));
      setIsLoading(false);
    });
  }, [
    assignedTrainerFilter,
    attendTypeFilter,
    branchFilter,
    data.trainees.length,
    isLoading,
    searchValue,
  ]);

  return (
    <>
      {selectedRows.length > 0 ? (
        <div className="flex flex-row-reverse">
        <DeleteTraineesAlert
          traineeIds={selectedRows.map((row) => row.traineeId)}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex h-8">
              <TrashIcon className="mr-2 h-4 w-4"></TrashIcon>
              Delete All
            </Button>
          </AlertDialogTrigger>
        </DeleteTraineesAlert>
        

        <AssignTrainerModal
          traineeIds={selectedRows.map((row) => row.id)}
          initialData={
             undefined
          }
          onSuccess={() => {
            router.refresh();
          }}
        >
          <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex h-8">
              <UserIcon className="mr-2 h-4 w-4"></UserIcon>
              Assign Trainer 
            </Button>
          </DialogTrigger>
        </AssignTrainerModal>

        </div>
      ) : null}
      <DataTableInfiniteLoading
        columns={columnsMemo}
        data={data.trainees}
        onLoadMore={onLoadMore}
        hasNextPage={data.trainees.length < data.total}
        onRowSelectionChange={(rows) => {
          //console.log("HTHTHT", rows);
          setSelectedRows(rows);
        }}
      />
    </>
  );
}

"use client";

import { getWaitingListTrainees } from "@/app/(home)/wait-list/actions";
import { columns } from "@/app/(home)/wait-list/components/columns";
import { DataTableInfiniteLoading } from "@/components/data-table/data-table";
import { AssignClassModal } from "@/components/modals/assign-class-modal";
import { DeleteTraineesAlert } from "@/components/modals/delete-trainees-modal";
import { MoveToHoldingListModal } from "@/components/modals/move-holding-list";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@/providers/user";
import { ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { BookIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export function PendingTestDataTable({
  columnsFnProps,
  data: initialData,
  total: initialTotal,
}: {
  columnsFnProps: any;
  data: any[];
  total: number;
}) {
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("q");
  const branchFilter = searchParams.get("branch");
  const attendTypeFilter = searchParams.get("attendType");
  const levelFilter = searchParams.get("level");

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
  const user = useUser();

  const columnsMemo = useMemo(() => columns(columnsFnProps), [columnsFnProps]);

  const onLoadMore = useCallback(() => {
    if (isLoading) return null;

    setIsLoading(true);
    getWaitingListTrainees({
      page: data.trainees.length / 10 + 1,
      keyword: searchValue ?? undefined,
      branchesIds: branchFilter ? branchFilter.split(",") : undefined,
      attendTypes: attendTypeFilter ? attendTypeFilter.split(",") : undefined,
      levels: levelFilter ? levelFilter.split(",") : undefined,
    }).then((res) => {
      setData((data) => ({
        total: res.total,
        trainees: [...data.trainees, ...res.trainees],
      }));
      setIsLoading(false);
    });
  }, [
    attendTypeFilter,
    branchFilter,
    data.trainees.length,
    isLoading,
    levelFilter,
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
          <Button variant="outline" size="sm" className="flex ml-2 h-8">
            <TrashIcon className="mr-2 h-4 w-4"></TrashIcon>
            Delete All
          </Button>
        </AlertDialogTrigger>
      </DeleteTraineesAlert>
            <MoveToHoldingListModal
            traineeIds={selectedRows.map((row) => row.traineeId)}
            onSuccess={() => {
              router.refresh();
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex h-8">
                <ArrowRightIcon className="mr-2 h-4 w-4"></ArrowRightIcon>
                Move To Hold List
              </Button>
            </DialogTrigger>
          </MoveToHoldingListModal>

          <AssignClassModal
          traineeIds={selectedRows.map((row) => row.traineeId)}
          branchId={selectedRows[0].trainee?.branch?.id.toString()}
          onSuccess={() => {
            router.refresh();
          }}
        >
          <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex h-8">
                <BookIcon className="mr-2 h-4 w-4"></BookIcon>
                Assign Class
              </Button>
          </DialogTrigger>
        </AssignClassModal>

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

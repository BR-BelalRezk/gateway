"use client";

import { getHoldingListTrainees } from "@/app/(home)/hold-list/actions";
import { columns } from "@/app/(home)/hold-list/components/columns";
import { DataTableInfiniteLoading } from "@/components/data-table/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, TrashIcon } from "lucide-react";
import { DeleteTraineesAlert } from "@/components/modals/delete-trainees-modal";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { MoveToWaitingListAlert } from "@/components/modals/move-to-waiting-list-modal";

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
  const router = useRouter();

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

  const columnsMemo = useMemo(() => columns(columnsFnProps), [columnsFnProps]);

  const onLoadMore = useCallback(() => {
    if (isLoading) return null;

    setIsLoading(true);
    getHoldingListTrainees({
      page: data.trainees.length / 10 + 1,
      keyword: searchValue ?? undefined,
      branchesIds: branchFilter ? branchFilter.split(",") : undefined,
      attendTypes: attendTypeFilter ? attendTypeFilter.split(",") : undefined,
      levels: levelFilter ? levelFilter.split(",") : undefined,
    }).then((res) => {
      setData((data) => ({
        total: res.total,
        trainees: [...data.trainees, ...res.trainees || []],
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
      <MoveToWaitingListAlert
        traineeIds={selectedRows.map((row) => row.traineeId)}
        onSuccess={() => {
          router.refresh();
        }}
      >
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex ml-auto h-8">
            <ArrowRightIcon className="mr-2 h-4 w-4"></ArrowRightIcon>
            Move To Waiting List
          </Button>
        </AlertDialogTrigger>
      </MoveToWaitingListAlert>
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

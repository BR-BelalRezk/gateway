"use client";

import { columns } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/attendance-table/columns";
import { TraineeInAttendance } from "@/app/(home)/batches/schema";
import { DataTable } from "@/components/data-table/data-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function AttendanceDataTable<TData>({
  classId,
  data: initialData,
}: {
  classId: string;
  data: TraineeInAttendance[];
}) {
  const [data, setData] = useState<{ users: any[] }>({
    users: initialData,
  });

  useEffect(() => {
    setData({
      users: initialData,
    });
  }, [initialData]);

  const columnsMemo = useMemo(() => columns({ classId }), [classId]);
  const q = useSearchParams().get("q");
  if(q) {
    const filteredData = initialData.filter((trainee) => {
      return trainee.trainee.fullName.toLowerCase().includes(q.toLowerCase()) || trainee.trainee.email?.toLowerCase().includes(q.toLowerCase()) || trainee.trainee.mobile?.toLowerCase().includes(q.toLowerCase());
    });
    data.users = filteredData;
  }
  return <DataTable columns={columnsMemo} data={data.users} />;
}

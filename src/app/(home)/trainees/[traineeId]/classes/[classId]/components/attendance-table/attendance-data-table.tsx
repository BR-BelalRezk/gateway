"use client";

import { columns } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/attendance-table/columns";
import { TraineeInAttendance } from "@/app/(home)/batches/schema";
import { DataTable } from "@/components/data-table/data-table";
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

  return <DataTable columns={columnsMemo} data={data.users} />;
}

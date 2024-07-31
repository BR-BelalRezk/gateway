"use client";

import { columns } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/trainees-table/columns";
import { ClassTrainee } from "@/app/(home)/batches/schema";
import { DataTable } from "@/components/data-table/data-table";
import { useEffect, useMemo, useState } from "react";

export function TraineesDataTable<TData>({
  data: initialData,
}: {
  data: ClassTrainee[];
}) {
  const [data, setData] = useState<{ users: any[] }>({
    users: initialData,
  });

  useEffect(() => {
    setData({
      users: initialData,
    });
  }, [initialData]);

  const columnsMemo = useMemo(() => columns(), []);

  return <DataTable columns={columnsMemo} data={data.users} />;
}

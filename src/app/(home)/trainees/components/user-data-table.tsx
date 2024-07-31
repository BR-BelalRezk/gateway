"use client";

import { getTrainees } from "@/app/(home)/trainees/actions";
import { columns } from "@/app/(home)/trainees/components/columns";
import { DataTableInfiniteLoading } from "@/components/data-table/data-table";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export function UsersDataTable<TData>({
  data: initialData,
  total: initialTotal,
}: {
  data: any[];
  total: number;
}) {
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("q");
  const branchFilter = searchParams.get("branch");

  const [data, setData] = useState<{ total: number; users: any[] }>({
    total: initialTotal,
    users: initialData,
  });

  useEffect(() => {
    setData({
      total: initialTotal,
      users: initialData,
    });
  }, [initialData, initialTotal]);

  const [isLoading, setIsLoading] = useState(false);

  const columnsMemo = useMemo(() => columns(), []);

  const onLoadMore = useCallback(() => {
    if (isLoading) return null;

    setIsLoading(true);
    getTrainees({
      page: data.users.length / 10 + 1,
      keyword: searchValue ?? undefined,
      branchesIds: branchFilter ? branchFilter.split(",") : undefined,
    }).then((res) => {
      setData((data) => ({
        total: res.total,
        users: [...data.users, ...res.users],
      }));
      setIsLoading(false);
    });
  }, [branchFilter, data.users.length, isLoading, searchValue]);

  return (
    <DataTableInfiniteLoading
      columns={columnsMemo}
      data={data.users}
      onLoadMore={onLoadMore}
      hasNextPage={data.users.length < data.total}
    />
  );
}

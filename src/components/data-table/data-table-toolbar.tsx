"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { DataTableRowActions } from "@/app/(home)/pending-test/components/data-table-row-actions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const isFiltered = useMemo(
    () => searchParams.toString().length > 0,
    [searchParams]
  );

  useEffect(() => {
    setSearchValue(searchParams?.get("q") || "");
  }, [searchParams, setSearchValue]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl(pathname, newParams));
  }

  return (
    <div className="flex items-start justify-between py-2 px-1 gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Filter..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </form>
        {table.getAllColumns().map((column) => {
          if (!column.columnDef.meta?.enableEnumFilter) return null;
          return (
            <DataTableFacetedFilter
              key={column.id}
              column={column}
              title={column.columnDef.meta?.filterLabel}
            />
          );
        })}
        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => {
              router.push(pathname);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
      {/* <DataTableRowActions row={table} /> */}
      <DataTableViewOptions table={table} />
    </div>
  );
}

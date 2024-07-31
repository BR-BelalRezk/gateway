"use client";

import * as React from "react";
import {
  ColumnDef,
  Row,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { LoadMore } from "@/components/data-table/load-more";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { set } from "date-fns";
import { useEffect } from "react";
import { DataTableRowActions } from "@/app/(home)/pending-test/components/data-table-row-actions";

const DataTableCore = <TData, TValue>({
  table,
  columns,
}: {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
}) => {
  return (
    <Table className="min-w-full">
      <TableHeader
        className={cn(
          "sticky top-0 bg-white dark:bg-slate-950 z-10",
          "after:content-[''] after:border-b after:bottom-0 after:w-full after:block after:absolute"
        )}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    index === headerGroup.headers.length - 1
                      ? "sticky right-0 bg-white dark:bg-slate-950"
                      : "",
                    index === 0
                      ? "sticky left-0 bg-white dark:bg-slate-950"
                      : ""
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          <React.Fragment>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      index === row.getVisibleCells().length - 1
                        ? "sticky right-0 bg-white dark:bg-slate-950"
                        : "",
                      index === 0
                        ? "sticky left-0 bg-white dark:bg-slate-950"
                        : ""
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </React.Fragment>
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

interface DataTableInfiniteLoadingProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  onRowSelectionChange?: (rowSelection: any) => void;
}

export function DataTableInfiniteLoading<TData, TValue>({
  columns,
  data,
  onLoadMore,
  hasNextPage,
  onRowSelectionChange,
}: DataTableInfiniteLoadingProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    onRowSelectionChange?.(
      table.getSelectedRowModel().rows.map((row) => row.original)
    );
  }, [rowSelection, table]);
  return (
    <div className="flex flex-col h-full gap-4">
      <DataTableToolbar table={table} />
      <div className="flex-1 rounded-md border overflow-auto">
        <DataTableCore table={table} columns={columns} />
        {hasNextPage ? <LoadMore onLoadMore={onLoadMore} /> : null}
      </div>
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="flex flex-col h-full gap-4">
      <DataTableToolbar table={table} />
      <div className="flex-1 rounded-md border overflow-auto">
        <DataTableCore table={table} columns={columns} />
      </div>
    </div>
  );
}

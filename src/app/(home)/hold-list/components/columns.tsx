"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { HoldListTraineeRow } from "@/app/(home)/hold-list/schema";
import { attendTypes } from "@/consts/attend-types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { getBranches } from "@/app/(home)/users/actions";
import { getLevels } from "@/app/(home)/pending-test/actions";

export const columns = ({
  canViewAllBranches,
}: {
  canViewAllBranches: boolean;
}): ColumnDef<HoldListTraineeRow>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.trainee.label);

      return (
        <div className="flex items-center gap-4">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.fullName}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.trainee.label);

      return (
        <div className="flex items-center gap-4">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.notes}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.mobile}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      if (!row.original.trainee.branch) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.branch.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.trainee.branch
        ? value.includes(row.original.trainee.branch.id.toString())
        : false;
    },
    meta: {
      possibleValues: async () => {
        const loadedBranches = await getBranches();
        return loadedBranches.filter((branch) => branch.label !== "HQ");
      },
      enableEnumFilter: canViewAllBranches,
      filterLabel: "Branch",
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => {
      if (!row.original.trainee.level) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.level.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.trainee.level
        ? value.includes(row.original.trainee.level.id.toString())
        : false;
    },
    meta: {
      possibleValues: async () => {
        const loadedLevels = await getLevels();
        return loadedLevels;
      },
      enableEnumFilter: true,
      filterLabel: "Level",
    },
  },
  {
    accessorKey: "attendType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attend Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.attendType}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.trainee.attendType
        ? value.includes(row.original.trainee.attendType)
        : false;
    },
    meta: {
      possibleValues: async () => attendTypes,
      enableEnumFilter: true,
      filterLabel: "Attend Type",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];

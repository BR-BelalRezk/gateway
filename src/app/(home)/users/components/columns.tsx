"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserRow } from "../schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { getBranches, getRoles } from "@/app/(home)/users/actions";

export const columns = (): ColumnDef<UserRow>[] => [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.image ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.role.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.role.value);
    },
    meta: {
      possibleValues: async () => {
        const loadedRoles = await getRoles();
        return loadedRoles;
      },
      enableEnumFilter: false,
      filterLabel: "Role",
    },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      if (!row.original.branch) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.branch.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.branch
        ? value.includes(row.original.branch.value.toString())
        : false;
    },
    meta: {
      possibleValues: async () => {
        const loadedBranches = await getBranches();
        return loadedBranches.filter((branch) => branch.label !== "HQ");
      },
      enableEnumFilter: true,
      filterLabel: "Branch",
    },
  },
  {
    accessorKey: "isDisabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Deactivated" />
    ),
    cell: ({ row }) => {
      if (!row.original.branch) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.isActivated ? "No" : "Yes"}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.branch
        ? value.includes(row.original.branch.value.toString())
        : false;
    },
    meta: {
      possibleValues: async () => {
        const loadedBranches = await getBranches();
        return loadedBranches.filter((branch) => branch.label !== "HQ");
      },
      enableEnumFilter: true,
      filterLabel: "Branch",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];

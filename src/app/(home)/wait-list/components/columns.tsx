"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { WaitListTraineeRow } from "@/app/(home)/wait-list/schema";
import { attendTypes } from "@/consts/attend-types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { getBranches } from "@/app/(home)/users/actions";
import { getLevels } from "@/app/(home)/pending-test/actions";

export const columns = ({
  canViewAllBranches,
}: {
  canViewAllBranches: boolean;
}): ColumnDef<WaitListTraineeRow>[] => [
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
    accessorKey: "preferredDayForTest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preferred Day For Test" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.preferredDayForTest}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "startTimeForTest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time For Test" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.startTimeForTest == "00:00:00"
              ? ""
              : row.original.trainee.startTimeForTest}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "preferredTimeSlot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preferred TimeSlot" />
    ),
    cell: ({ row }) => {
      if (!row.original.trainee.preferredSlot) return null;
      const timeslot = row.original.trainee.preferredSlot;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {`${timeslot.day1} ${timeslot.startTime
              .split(":")
              .slice(0, 2)
              .join(":")}`}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "secondePreferredTimeSlot",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Second Preferred TimeSlot"
      />
    ),
    cell: ({ row }) => {
      if (!row.original.trainee.secondPreferredSlot) return null;
      const timeslot = row.original.trainee.secondPreferredSlot;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {`${timeslot.day1} ${timeslot.startTime
              .split(":")
              .slice(0, 2)
              .join(":")}`}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "paymentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Type" />
    ),
    cell: ({ row }) => {
      if (
        !row.original.trainee.paymentHistory ||
        !row.original.trainee.paymentHistory.length
      )
        return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.paymentHistory[0].paidType}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "paidValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid Value" />
    ),
    cell: ({ row }) => {
      if (
        !row.original.trainee.paymentHistory ||
        !row.original.trainee.paymentHistory.length
      )
        return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.paymentHistory[0].paidValue}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "remainingValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Value" />
    ),
    cell: ({ row }) => {
      if (
        !row.original.trainee.paymentHistory ||
        !row.original.trainee.paymentHistory.length
      )
        return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.paymentHistory[0].remainingValue}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];

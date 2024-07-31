"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterPossibleValues } from "@/types/columns";
import { TraineeRow } from "@/app/(home)/pending-test/schema";
import { attendTypes } from "@/consts/attend-types";
import { formatWithUserTimeZone } from "@/lib/utils";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { getBranches } from "@/app/(home)/users/actions";
import {
  getTrainers,
  getUsersOptions,
} from "@/app/(home)/pending-test/actions";

export const columns = ({
  canViewAllBranches,
  canViewAllTrainers,
}: {
  canViewAllBranches: boolean;
  canViewAllTrainers: boolean;
}): ColumnDef<TraineeRow>[] => [
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
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.fullName}
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
            {row.getValue("mobile")}
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
      if (!row.original.branch) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.branch.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.branch
        ? value.includes(row.original.branch.id.toString())
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
    accessorKey: "assignedTrainer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Trainer" />
    ),
    cell: ({ row }) => {
      if (!row.original.assignedTrainer) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.assignedTrainer.aspNetUser.userName}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.assignedTrainer
        ? value.includes(row.original.assignedTrainer.id.toString())
        : false;
    },
    meta: {
      possibleValues: async () => {
        const loadedTrainers = await getTrainers();
        return loadedTrainers;
      },
      enableEnumFilter: canViewAllTrainers,
      filterLabel: "Assigned Trainer",
    },
  },
  {
    accessorKey: "followUpUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Follow Up" />
    ),
    cell: ({ row }) => {
      if (!row.original.followUpUser) return null;
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.followUpUser.map(u=> u.userName + " ")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.followUpUser
        ? value.includes(row.original.followUpUser.filter(i=>i.id.toString()))
        : false;
    },
    meta: {
      possibleValues: async () => {
        const loadedUsers = await getUsersOptions();
        return loadedUsers.filter((user) => user.label !== "HQ");
      },
      enableEnumFilter: true,
      filterLabel: "Assigned Follow Up",
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
            {row.getValue("attendType")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.attendType
        ? value.includes(row.original.attendType)
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
            {row.getValue("preferredDayForTest")}
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
            {row.original.startTimeForTest
              ? format(
                  new Date(`2023-09-10T${row.original.startTimeForTest}`),
                  "hh:mm a"
                )
              : null}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "testDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Test Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.testDate
              ? formatWithUserTimeZone(
                  new Date(row.original.testDate),
                  "MMM d, y - hh:mm a"
                )
              : null}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  // {
  //   accessorKey: "paymentType",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Payment Type" />
  //   ),
  //   cell: ({ row }) => {
  //     if (!row.original.paymentHistory || !row.original.paymentHistory.length)
  //       return null;
  //     return (
  //       <div className="flex items-center gap-4">
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.original.paymentHistory[0].paidType}
  //         </span>
  //       </div>
  //     );
  //   },
  //   enableGlobalFilter: true,
  // },
  // {
  //   accessorKey: "paidValue",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Paid Value" />
  //   ),
  //   cell: ({ row }) => {
  //     if (!row.original.paymentHistory || !row.original.paymentHistory.length)
  //       return null;
  //     return (
  //       <div className="flex items-center gap-4">
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.original.paymentHistory[0].paidValue}
  //         </span>
  //       </div>
  //     );
  //   },
  //   enableGlobalFilter: true,
  // },
  // {
  //   accessorKey: "remainingValue",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Remaining Value" />
  //   ),
  //   cell: ({ row }) => {
  //     if (!row.original.paymentHistory || !row.original.paymentHistory.length)
  //       return null;
  //     return (
  //       <div className="flex items-center gap-4">
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.original.paymentHistory[0].remainingValue}
  //         </span>
  //       </div>
  //     );
  //   },
  //   enableGlobalFilter: true,
  // },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.notes}
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

/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { TraineeInAttendance } from "@/app/(home)/batches/schema";
import {
  ToggleAttendanceInput,
  toggleAttendance,
} from "@/app/(home)/batches/actions";
import { useRouter } from "next/navigation";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

const onCheck = async (input: ToggleAttendanceInput) => {
  const res = await toggleAttendance(input);
  ////console.log("QWEQWEQW", res);
};

export const columns = ({classId}: {classId: string}): ColumnDef<TraineeInAttendance>[] => [
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
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainee.fullName}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

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
    accessorKey: "adminNote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Admin Note" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.adminNotes}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "tranierNote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trainer Note" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.trainerNotes}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session1",
    header: ({ column }) => <DataTableColumnHeader column={column} title="1" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session1"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 1
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "1",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "session1notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 1 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 1)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session2",
    header: ({ column }) => <DataTableColumnHeader column={column} title="2" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session2"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 2
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "2",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "session2notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 2 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 2)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session3",
    header: ({ column }) => <DataTableColumnHeader column={column} title="3" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session3"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 3
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "3",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "session3notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 3 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 3)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
    
  },
  {
    accessorKey: "session4",
    header: ({ column }) => <DataTableColumnHeader column={column} title="4" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session4"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 4
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "4",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "session4notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 4 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 4)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session5",
    header: ({ column }) => <DataTableColumnHeader column={column} title="5" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session5"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 5
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "5",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "session5notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 5 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 5)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session6",
    header: ({ column }) => <DataTableColumnHeader column={column} title="6" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session6"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 6
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "6",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },  {
    accessorKey: "session6notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 6 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 6)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session7",
    header: ({ column }) => <DataTableColumnHeader column={column} title="7" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session7"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 7
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "7",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "session7notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 7 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 7)?.noteFromSession}
          </span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "session8",
    header: ({ column }) => <DataTableColumnHeader column={column} title="8" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id="session8"
            checked={row.original.attendance.some(
              (attendance) => attendance.dayNumber === 8
            )}
            onCheckedChange={(checked) => {
              onCheck({
                classId: classId,
                dayNumber: "8",
                isNew: checked !== false,
                traineeId: row.original.trainee.id.toString(),
              }).then(() => {
                router.refresh();
              });
            }}
          />
        </div>
      );
    },
  },
    {
    accessorKey: "session8notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session 8 Notes" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex items-center gap-4">
          <span className="max-w-[500px] font-medium">
            {row.original.attendance.find(d=> d.dayNumber === 8)?.noteFromSession}
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

import { AttendanceDataTable } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/attendance-table/attendance-data-table";
import { getClassAttendanceById } from "@/app/(home)/batches/actions";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

export const ClassAttendanceCard = async ({ classId }: { classId: string }) => {
  const classAttendance = await getClassAttendanceById(classId);

  return (
    <Card className="flex rounded-md flex-col gap-4">
      <div className="flex p-6 justify-between items-center">
        <div className="flex gap-1 items-center">
          <Info className="h-5 w-5" />
          <h2 className="text-lg">Attendance</h2>
        </div>
        {/* <ClassDetailsCardActions
          classData={classData}
          types={types}
          rooms={rooms}
          trainers={trainers}
          timeSlots={timeSlots}
        /> */}
      </div>

      <div className="flex flex-col p-6 pt-0">
        <AttendanceDataTable data={classAttendance} classId={classId} />
      </div>
    </Card>
  );
};

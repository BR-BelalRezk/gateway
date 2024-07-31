import { ClassDetailsCard } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/class-details-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getClassById } from "@/app/(home)/batches/actions";
import { ClassTraineesCard } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/class-trainees-card";

export default async function ClassPage({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <ScrollArea className="flex flex-col flex-1 overflow-hidden w-full">
      <div className="flex flex-col gap-4 p-5">
        <ClassDetailsCard classId={params.classId} isInAttendance={false} />
        <ClassTraineesCard classId={params.classId} />
      </div>
    </ScrollArea>
  );
}

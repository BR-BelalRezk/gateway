// import { TraineeCard } from "@/app/(home)/trainees/[traineeId]/components/trainee-card";
import { TraineeDetailsCard } from "@/app/(home)/trainees/[traineeId]/components/trainee-details-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function BatchPage({
  params,
  searchParams,
}: {
  params: { traineeId: string };
  searchParams: { [key: string]: string | string[] };
}) {

  
  return (
    <ScrollArea className="flex flex-col flex-1 overflow-hidden w-full">
      <div className="flex flex-col gap-4 p-5">
        <TraineeDetailsCard traineeId={params.traineeId} />
        {/* <TraineeCard
          batchId={params.traineeId}
          searchParams={searchParams}
        /> */}
      </div>
    </ScrollArea>
  );
}

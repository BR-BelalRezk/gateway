import { BatchClassesCard } from "@/app/(home)/batches/[batchId]/components/batch-classes-card";
import { BatchDetailsCard } from "@/app/(home)/batches/[batchId]/components/batch-details-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function BatchPage({
  params,
  searchParams,
}: {
  params: { batchId: string };
  searchParams: { [key: string]: string | string[] };
}) {
  return (
    <ScrollArea className="flex flex-col flex-1 overflow-hidden w-full">
      <div className="flex flex-col gap-4 p-5">
        <BatchDetailsCard batchId={params.batchId} />
        <BatchClassesCard
          batchId={params.batchId}
          searchParams={searchParams}
        />
      </div>
    </ScrollArea>
  );
}

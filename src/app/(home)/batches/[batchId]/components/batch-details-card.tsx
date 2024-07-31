import { BatchDetailsCardActions } from "@/app/(home)/batches/[batchId]/components/batch-details-card-actions";
import { getBatchById } from "@/app/(home)/batches/actions";
import { BatchWithClassCount } from "@/app/(home)/batches/schema";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { cn, formatWithUserTimeZone } from "@/lib/utils";
import { FilterPossibleValues } from "@/types/columns";
import { CalendarIcon, CheckCircle, Info, Store, Users } from "lucide-react";
import { useMemo } from "react";

export const BatchDetailsCard = async ({ batchId }: { batchId: string }) => {
  const user = await getCurrentUser();

  const canViewManageBatches = ["Manager", "SuperManager"].includes(
    user?.role!
  );

  const batch = await getBatchById(batchId);

  const startDateFormatted = formatWithUserTimeZone(
    new Date(batch.batch.startDate),
    "MMM d, y"
  );

  const endDateFormatted = !batch.batch.endDate
    ? ""
    : `${formatWithUserTimeZone(new Date(batch.batch.endDate), "MMM d, y")}`;

  return (
    <Card className="flex rounded-md flex-col gap-4">
      <div className="flex p-6 justify-between items-center">
        <div className="flex gap-1 items-center">
          <Info className="h-5 w-5" />
          <h2 className="text-lg">Details</h2>
        </div>
        {canViewManageBatches ? (
          <BatchDetailsCardActions batch={batch} />
        ) : null}
      </div>

      <div className="flex flex-col p-6 pt-0">
        <div className="flex mt-5 mb-10">
          <h2 className="text-2xl"> {batch.batch.name}</h2>
        </div>

        <div className="flex justify-between flex-wrap gap-5 gap-y-5">
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <p className="text-sm text-gray-700">Classes</p>
            </div>
            <p className="text-sm font-bold">{batch.classCount}</p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />

              <p className="text-sm text-gray-700">Start Date</p>
            </div>
            <p className="text-sm font-bold">{startDateFormatted}</p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">End Date</p>
            </div>
            <p className="text-sm font-bold">{endDateFormatted}</p>
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              <p className="text-sm text-gray-700">Branch</p>
            </div>
            <p className="text-sm font-bold">{batch.batch.branch.name}</p>
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm text-gray-700">Status</p>
            </div>
            <Badge
              variant="default"
              className={cn(
                "px-3 w-fit",
                batch.batch.isActive ? "bg-green-500" : ""
              )}
            >
              {batch.batch.isActive ? "Active" : "Archived"}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

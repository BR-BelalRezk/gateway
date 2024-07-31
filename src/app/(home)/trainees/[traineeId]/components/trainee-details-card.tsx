import { BatchDetailsCardActions } from "@/app/(home)/batches/[batchId]/components/batch-details-card-actions";
import { getBatchById } from "@/app/(home)/batches/actions";
import { BatchWithClassCount } from "@/app/(home)/batches/schema";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { cn, formatWithUserTimeZone } from "@/lib/utils";
import { FilterPossibleValues } from "@/types/columns";
import { AxeIcon, BookIcon, CalendarIcon, CheckCircle, GroupIcon, Info, MessageCircleIcon, StickyNoteIcon, Store, TimerIcon, Users } from "lucide-react";
import { useMemo } from "react";
import { getTrainee } from "../../actions";
import { MobileIcon } from "@radix-ui/react-icons";

export const TraineeDetailsCard = async ({
  traineeId,
}: {
  traineeId: string;
}) => {
  const user = await getCurrentUser();

  const canViewManageBatches = ["Manager", "SuperManager"].includes(
    user?.role!
  );

  const { traineeData: trainee, classData } = await getTrainee({
    id: traineeId,
  });

  const formatDate =  (date?: string) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
  return (
    <Card className="flex rounded-md flex-col gap-4">
      <div className="flex p-6 justify-between items-center">
        <div className="flex gap-1 items-center">
          <Info className="h-5 w-5" />
          <h2 className="text-lg">Main Details</h2>
        </div>
        {/* {canViewManageBatches ? (
          <BatchDetailsCardActions batch={trainee} />
        ) : null} */}
      </div>

      <div className="flex flex-col p-6 pt-0">
        <div className="flex justify-between flex-wrap gap-5 gap-y-5">
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <p className="text-sm text-gray-700">Assigned Trainer</p>
            </div>
            <p className="text-sm font-bold">{trainee.fullName}</p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <MobileIcon className="h-5 w-5" />

              <p className="text-sm text-gray-700">Mobile</p>
            </div>
            <p className="text-sm font-bold">
              {trainee.mobile || "Not Provided"}
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Email</p>
            </div>
            <p className="text-sm font-bold">
              {trainee.email || "Not Provided"}
            </p>
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              <p className="text-sm text-gray-700">Branch</p>
            </div>
            <p className="text-sm font-bold">{trainee.branch.name}</p>
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
                trainee.currentStatus ? "bg-green-500" : ""
              )}
            >
              {trainee.currentStatus ?? "Unknown"}
            </Badge>
          </div>
        </div>


        <div className="flex justify-between flex-wrap gap-5 gap-y-5 my-5">
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Preferred Test Day</p>
            </div>
            <p className="text-sm font-bold">
              {trainee.preferredDayForTest || "Not Provided"}
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <TimerIcon className="h-5 w-5" />

              <p className="text-sm text-gray-700">Preferred Slot</p>
            </div>
            <p className="text-sm font-bold">
              {(trainee.preferredSlot?.day1 || "Not Provided") +
                " Or " +
                (trainee.preferredSlot?.day2 || "Not Provided") +
                " At " +
                (trainee.preferredSlot?.startTime || "Not Provided") +
                " - " +
                (trainee.preferredSlot?.endTime || "Not Provided")}
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <TimerIcon className="h-5 w-5" />

              <p className="text-sm text-gray-700">Second Preferred Slot</p>
            </div>
            <p className="text-sm font-bold">
              {(trainee.secondPreferredSlot?.day1 || "Not Provided") +
                " Or " +
                (trainee.secondPreferredSlot?.day2 || "Not Provided") +
                " At " +
                (trainee.secondPreferredSlot?.startTime || "Not Provided") +
                " - " +
                (trainee.secondPreferredSlot?.endTime || "Not Provided")}
            </p>
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Attend Type</p>
            </div>
            <p className="text-sm font-bold">{trainee.attendType}</p>
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <StickyNoteIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Notes</p>
            </div>
            <p className="text-sm font-bold">{trainee.notes}</p>

          </div>
        </div>


        <div className="flex justify-between flex-wrap gap-5 gap-y-5 my-5">
        <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />

              <p className="text-sm text-gray-700">Test Date</p>
            </div>
            <p className="text-sm font-bold">
              {formatDate(trainee.testDate || "") || "Not Provided"}
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <BookIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Education</p>
            </div>
            <p className="text-sm font-bold">
              {trainee.education || "Not Provided"}
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <AxeIcon className="h-5 w-5" />

              <p className="text-sm text-gray-700">Job</p>
            </div>
            <p className="text-sm font-bold">
              {trainee.job || "Not Provided"}
            </p>
          </div>


          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Location</p>
            </div>
            <p className="text-sm font-bold">{trainee.country?.name} {trainee.city?.name}</p>
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-[150px]">
            <div className="flex items-center gap-2">
              <GroupIcon className="h-5 w-5" />
              <p className="text-sm text-gray-700">Follow Up Users</p>
            </div>
            <p className="text-sm font-bold">{trainee.followUpUser?.map(x=> x.userName) ?? "No Followups assigned"}</p>

          </div>
        </div>
      </div>
    </Card>
  );
};

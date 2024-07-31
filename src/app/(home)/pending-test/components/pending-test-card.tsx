import { getPendingTestTrainees } from "@/app/(home)/pending-test/actions";
import { PendingTestDataTable } from "@/app/(home)/pending-test/components/user-data-table";
import { AssignTrainerModal } from "@/components/modals/assign-trainer-modal";
import { TraineeModal } from "@/components/modals/trainee-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const PendingTestCard = async ({
  className,
  searchParams,
}: {
  className?: string;
  searchParams: { [key: string]: string | string[] };
}) => {
  const user = await getCurrentUser();
  const canViewAllBranches = user?.branchId === "4";
  const canViewAllTrainers = user?.role !== "Trainer";

  const {
    q: searchValue,
    branch,
    attendType,
    assignedTrainer,
  } = searchParams as { [key: string]: string };

  const trainees = await getPendingTestTrainees({
    page: 1,
    keyword: searchValue,
    branchesIds: canViewAllBranches
      ? branch
        ? branch.split(",")
        : undefined
      : [user?.branchId!],
    attendTypes: attendType ? attendType.split(",") : undefined,
    assignedTrainers: !canViewAllTrainers
      ? [user?.id!]
      : assignedTrainer
      ? assignedTrainer.split(",")
      : undefined,
  });
  return (
    <Card
      className={cn(
        "flex bg-white dark:bg-slate-950 w-full rounded-md flex-col p-4 gap-4 overflow-hidden",
        className
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Trainees Pending Test</h2>

        <TraineeModal>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="text-md">
              Add Trainee
            </Button>
          </DialogTrigger>
        </TraineeModal>
      </div>
      <div className="w-full flex-1 overflow-y-hidden">
        <PendingTestDataTable data={trainees.trainees} total={trainees.total} />
      </div>
    </Card>
  );
};

import React from "react";

import { Button } from "@/components/ui/button";

import { Metadata } from "next";
import { PendingTestDataTable } from "@/app/(home)/hold-list/components/user-data-table";
import { Card } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { getHoldingListTrainees } from "@/app/(home)/hold-list/actions";
import { getCurrentUser } from "@/lib/session";
import { TraineeModal } from "@/components/modals/trainee-modal";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Hold List",
  description: "Manage trainees hold list",
};

export default async function PendingTestPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const user = await getCurrentUser();
  // const router = useRouter();

  const canViewAllBranches = user?.branchId === "4";

  const {
    q: searchValue,
    branch,
    attendType,
    level,
  } = searchParams as { [key: string]: string };

  const trainees = await getHoldingListTrainees({
    page: 1,
    keyword: searchValue,
    branchesIds: canViewAllBranches
      ? branch
        ? branch.split(",")
        : undefined
      : [user?.branchId!],
    attendTypes: attendType ? attendType.split(",") : undefined,
    levels: level ? level.split(",") : undefined,
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden p-5 w-full">
      <Card className="flex bg-white dark:bg-slate-950 w-full h-full overflow-hidden rounded-md flex-col p-4 gap-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Hold List</h2>

          <TraineeModal>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="text-md">
                Add Trainee
              </Button>
            </DialogTrigger>
          </TraineeModal>
        </div>
        <div className="w-full flex-1 overflow-y-hidden">
          <PendingTestDataTable
            columnsFnProps={{
              canViewAllBranches,
            }}
            data={trainees.trainees || []}
            total={trainees.total}
          />
        </div>
      </Card>
    </div>
  );
}

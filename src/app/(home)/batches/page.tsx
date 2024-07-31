import { BatchCard } from "@/app/(home)/batches/components/batch-card";
import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Archive, CheckCircle } from "lucide-react";
import { getBranches } from "@/app/(home)/users/actions";
import { getBatches } from "@/app/(home)/batches/actions";
import { BranchesTabs } from "@/app/(home)/batches/components/branches-tab";
import { AddBatchButton } from "@/app/(home)/batches/components/add-batch-button";
import { getCurrentUser } from "@/lib/session";

export default async function BatchesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const user = await getCurrentUser();

  const canViewAllBranches = user?.branchId === "4";
  const canViewManageBatches = ["Manager", "SuperManager"].includes(
    user?.role!
  );

  const branches = (await getBranches()).filter(
    (branch) => branch.label != "HQ"
  );

  const { branch: branchId } = searchParams as { [key: string]: string };

  const activeBranch = canViewAllBranches
    ? branchId ?? branches[0].value
    : user?.branchId!;

  const batches = await getBatches({ branchId: activeBranch });

  const activeBatch = batches.batches.find((b) => b.batch.isActive);
  const archivedBatches = batches.batches.filter((b) => !b.batch.isActive);

  return (
    <ScrollArea className="flex flex-col flex-1 overflow-hidden w-full">
      <div className="flex flex-col gap-4 p-5">
        {canViewAllBranches ? (
          <div className="flex gap-3 border w-fit bg-muted rounded-md px-1">
            <BranchesTabs activeBranch={activeBranch} branches={branches} />
          </div>
        ) : null}

        <Card className="flex rounded-md flex-col gap-4">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <CheckCircle className="h-8 w-8" />
                <h2 className="text-lg">Active Batches</h2>
              </div>

              {!activeBatch && canViewManageBatches ? (
                <AddBatchButton activeBranch={activeBranch} />
              ) : null}
            </div>
          </CardHeader>

          <div className="px-6 pb-6">
            <div className="flex gap-4 flex-wrap">
              {activeBatch ? (
                <div className="flex-1 min-w-[300px]">
                  <BatchCard batch={activeBatch} />
                </div>
              ) : null}
            </div>
          </div>
        </Card>
        <Card className="flex rounded-md flex-col gap-4">
          <div className="flex py-6 px-6 justify-between">
            <div className="flex gap-1 items-center">
              <Archive className="h-8 w-8" />

              <h2 className="text-lg">Batches Archive</h2>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="flex gap-4 flex-wrap">
              {archivedBatches.map((batch) => (
                <div key={batch.batch.id} className="flex-1 min-w-[300px]">
                  <BatchCard batch={batch} />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}

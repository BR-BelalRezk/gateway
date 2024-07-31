import { AddClassButton } from "@/app/(home)/batches/[batchId]/components/add-class-button";
import { ClassCard } from "@/app/(home)/batches/[batchId]/components/class-card";
import { ClassFilterToolbar } from "./class-filter-toolbar";
import { getBatchClassesById } from "@/app/(home)/batches/actions";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";

export const BatchClassesCard = async ({
  batchId,
  searchParams,
}: {
  batchId: string;
  searchParams: { [key: string]: string | string[] };
}) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const canViewManageBatches = ["Manager", "SuperManager"].includes(
    user?.role!
  );
  const isTrainer = user.role == "Trainer";

  const {
    q: searchValue,
    type: typeFilter,
    trainer: trainerFilter,
    level: levelFilter,
  } = searchParams as { [key: string]: string };

  const classes = await getBatchClassesById({
    batchId,
    keyword: searchValue ?? undefined,
    types: typeFilter,
    levels: levelFilter,
    trainers: isTrainer ? user.id : trainerFilter ? trainerFilter : undefined,
  });

  const myClasses = isTrainer
    ? classes.filter((c) => c.trainer.aspNetUserId === user.id)
    : classes;

  return (
    <Card className="flex rounded-md flex-col gap-4">
      <div className="flex p-6 justify-between">
        <div className="flex gap-1 items-center">
          <Users className="h-5 w-5" />
          <h2 className="text-black text-lg">Classes</h2>
        </div>

        {canViewManageBatches ? <AddClassButton activeBatch={batchId} /> : null}
      </div>

      <div className="flex flex-col gap-2 px-6 pb-6">
        <ClassFilterToolbar />
        <div className="flex gap-4 flex-wrap">
          {myClasses.map((item) => (
            <div key={item.id} className="flex-1 min-w-[350px]">
              <ClassCard
                key={item.id}
                class={item}
                canViewManageBatches={canViewManageBatches}
                onlyViewAttendance={isTrainer}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

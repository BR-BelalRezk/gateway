import { BatchCardActions } from "@/app/(home)/batches/components/batch-card-actions";
import { BatchWithClassCount } from "@/app/(home)/batches/schema";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { formatWithUserTimeZone } from "@/lib/utils";
import { Users } from "lucide-react";
import Link from "next/link";

export const BatchCard = async ({ batch }: { batch: BatchWithClassCount }) => {
  const user = await getCurrentUser();
  const canViewManageBatches = ["Manager", "SuperManager"].includes(
    user?.role!
  );

  const dateFormatted = `${formatWithUserTimeZone(
    new Date(batch.batch.startDate),
    "MMM d, y"
  )}${
    batch.batch.endDate
      ? ` -> ${formatWithUserTimeZone(
          new Date(batch.batch.endDate),
          "MMM d, y"
        )}`
      : ""
  }`;

  return (
    <Card className="mb-2">
      <CardHeader>
        <div className="flex gap-1 items-center justify-between">
          <h2 className=""> {batch.batch.name}</h2>
          {canViewManageBatches ? <BatchCardActions batch={batch} /> : null}
        </div>

        <p className="pt-2 text-sm text-gray-500">{dateFormatted}</p>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-4 w-4" />
          <p>{batch.classCount} Classes</p>
        </div>
        <Link href={`/batches/${batch.batch.id}`}>
          <Button size={"sm"}>View here</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

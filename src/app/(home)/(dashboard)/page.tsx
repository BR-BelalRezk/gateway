import { AnnouncementsCard } from "@/app/(home)/(dashboard)/components/announcements-card/announcements-card";
import { TraineeCreationStatisticsCard } from "@/app/(home)/(dashboard)/components/trainee-creation-statistics-card/trainee-creation-statistics-card";
import { PendingTestCard } from "@/app/(home)/pending-test/components/pending-test-card";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  return (
    <div className="flex flex-col flex-1 gap-5 p-5 overflow-auto">
      <div className="flex flex-wrap gap-5">
        <div className="flex-1 min-w-[250px] max-h-56">
          <AnnouncementsCard />
        </div>
        <div className="flex-1 min-w-[250px]">
          <TraineeCreationStatisticsCard />
        </div>
      </div>
      <PendingTestCard searchParams={searchParams} className="min-h-[500px]" />
    </div>
  );
}

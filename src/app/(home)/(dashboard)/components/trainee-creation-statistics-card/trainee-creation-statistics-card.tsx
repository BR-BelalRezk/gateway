import { getTraineeCreationInfo } from "@/app/(home)/(dashboard)/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const TraineeCreationStatisticsCard = async () => {
  const traineeCreationInfo = await getTraineeCreationInfo();

  if (traineeCreationInfo.ok === false) {
    return null;
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Trainee Creation Statistics</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {traineeCreationInfo.data.usersWithHighestCountName === "" ? (
          <div className="flex items-center justify-center space-x-4">
            <p className="text-lg font-medium leading-none">
              No one created trainees today
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Me</p>
                </div>
              </div>
              <p className="ml-auto">
                {traineeCreationInfo.data.myTraineeCount}
              </p>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/02.png" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Highest Creator:{" "}
                    {traineeCreationInfo.data.usersWithHighestCountName}
                  </p>
                  {/* <p className="text-sm text-muted-foreground">p@example.com</p> */}
                </div>
              </div>
              <p>{traineeCreationInfo.data.usersWithHighestCountLogs}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

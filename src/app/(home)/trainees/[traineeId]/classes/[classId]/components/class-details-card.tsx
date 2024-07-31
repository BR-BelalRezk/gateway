import { ClassDetailsCardActions } from "@/app/(home)/batches/[batchId]/classes/[classId]/components/class-details-card-actions";
import { getClassById } from "@/app/(home)/batches/actions";
import { Class } from "@/app/(home)/batches/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book, Info, MapPin, Users } from "lucide-react";
import Link from "next/link";

export const ClassDetailsCard = async ({
  classId,
  isInAttendance = false,
}: {
  classId: string;
  isInAttendance: boolean;
}) => {
  const classData = await getClassById(classId);

  const dateFormatted = `${
    classData.timeSlot.day1
  } ${classData.timeSlot.startTime.split(":").slice(0, 2).join(":")}`;

  return (
    <Card className="flex rounded-md flex-col gap-4">
      <div className="flex p-6 justify-between items-center">
        <div className="flex gap-1 items-center">
          <Info className="h-5 w-5" />
          <h2 className="text-lg">Details</h2>
        </div>
        <div className="flex items-center gap-3">
          {!isInAttendance ? (
            <Link
              href={`/batches/${classData.batch.id}/classes/${classData.id}/attendance`}
            >
              <Button className="flex py-0" size={"sm"}>
                Go To Attendance
              </Button>
            </Link>
          ) : null}
          <ClassDetailsCardActions classData={classData} />
        </div>
      </div>

      <div className="flex flex-col p-6 pt-0">
        <div className="flex flex-col gap-2 mb-10">
          <h2 className="text-2xl"> {classData.name}</h2>
          <p className="pt-2 text-sm text-gray-700">{dateFormatted}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <p className="text-sm text-gray-700">Trainer</p>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={classData.trainer.aspNetUser.image ?? undefined}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{classData.trainer.aspNetUser.userName}</p>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />

              <p className="text-sm text-gray-700">Trainees</p>
            </div>
            <p className="text-sm font-bold">
              {classData.classTrainees.length}
            </p>
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <p className="text-sm text-gray-700">Room</p>
            </div>
            <p className="text-sm font-bold">{classData.room.name}</p>
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <p className="text-sm text-gray-700">Level</p>
            </div>
            <p className="text-sm font-bold">{classData.level.name}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

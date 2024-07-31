"use client";

import { ClassCardActions } from "@/app/(home)/batches/[batchId]/components/class-card-actions";
import { Class } from "@/app/(home)/batches/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Book, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const ClassCard = ({
  class: classData,
  canViewManageBatches,
  onlyViewAttendance,
}: {
  class: Class;
  canViewManageBatches: boolean;
  onlyViewAttendance: boolean;
}) => {
  const { push } = useRouter();
  const dateFormatted = useMemo(() => {
    return `${classData.timeSlot.day1} ${classData.timeSlot.startTime
      .split(":")
      .slice(0, 2)
      .join(":")}`;
  }, [classData.timeSlot]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="mb-2">
        <CardHeader>
          <div className="flex gap-1 justify-between items-center">
            <h2 className="text-md"> {classData.name}</h2>
            {canViewManageBatches ? (
              <ClassCardActions classData={classData} />
            ) : null}
          </div>
          <p className="pt-2 text-sm text-gray-700">{dateFormatted}</p>
        </CardHeader>
        <CardFooter className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={classData.trainer.aspNetUser.image ?? undefined}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{classData.trainer.aspNetUser.userName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <p>{classData.classTrainees.length} Trainees</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <p>{classData.room.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <p>{classData.level.name}</p>
            </div>
          </div>

          <Button
            size={"sm"}
            className="whitespace-nowrap"
            onClick={() => {
              if (onlyViewAttendance)
                push(
                  `/batches/${classData.batchId}/classes/${classData.id}/attendance`
                );
              else
                push(`/batches/${classData.batchId}/classes/${classData.id}`);
            }}
          >
            View here
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

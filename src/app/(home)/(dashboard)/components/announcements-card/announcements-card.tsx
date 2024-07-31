import { getNotes } from "@/app/(home)/(dashboard)/actions";
import { AnnouncementsCardActions } from "./announcements-card-actions";
import { SingleAnnouncementActions } from "./single-announcements-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";

export const AnnouncementsCard = async () => {
  const user = await getCurrentUser();

  const notes = await getNotes();

  const canManageAnnouncements = ["Manager", "SuperManager"].includes(
    user?.role!
  );

  return (
    <Card className="flex flex-col overflow-hidden max-h-full min-h-full">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>
            You made {notes.length} announcements.
          </CardDescription>
        </div>
        {canManageAnnouncements ? <AnnouncementsCardActions /> : null}
      </CardHeader>
      <CardContent className="overflow-auto flex-1">
        <div className="space-y-8">
          {notes.map((note) => (
            <div key={note.id} className="flex items-center justify-between">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{note.note}</p>
              </div>
              {canManageAnnouncements ? (
                <SingleAnnouncementActions noteId={note.id.toString()} />
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

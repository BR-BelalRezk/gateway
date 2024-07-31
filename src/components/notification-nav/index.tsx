"use client";

import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import firebase from "../../services/firebase";
import { useUser } from "@/providers/user";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
export function NotificationNav() {
  const { user } = useUser();
  let value = Object.values({});
  const [notifications, setNotifications] = useState(value);
  const { toast } = useToast();

  const markAllNotificationsAsRead = () => {
    const database = firebase.database();
    const notificationsRef = database.ref(user.id);
    //console.log("MARKING AS READ")
    notificationsRef.once("value", (snapshot) => {
      const notificationsData = snapshot.val();
      //console.log("DATA", notificationsData)

      if (notificationsData) {
        const notificationsToUpdate = Object.keys(notificationsData)
          .filter((n: any) => {
            return !n.IsRead;
          })
          .map((key) => ({
            key,
            ...notificationsData[key],
            IsRead: true, // Set IsRead to true for all notifications
          }));
        //console.log("notificationsToUpdate" , notificationsToUpdate)

        // Update all notifications in Firebase
        notificationsToUpdate.forEach((notification) => {
          notificationsRef.child(notification.key).update({
            IsRead: true,
          });
        });
      }
    });
  };

  useEffect(() => {
    const database = firebase.database();

    if (user) {
      const notificationsRef = database.ref(user.id);

      const listenToNewNotifications = (callback: any) => {
        notificationsRef.on("child_added", (snapshot) => {
          const newNotification = snapshot.val();
          callback(newNotification); // Pass the new notification to the callback function
        });
      };

      const handleSnapshot = (snapshot: any) => {
        const notificationsData = snapshot.val();
        if (notificationsData) {
          let notificationsArray = Object.values(notificationsData);
          setNotifications(notificationsArray.reverse());
        } else {
          setNotifications([]); // No notifications, reset to empty array
        }
      };

      notificationsRef.on("value", handleSnapshot);

      listenToNewNotifications((notification: any) => {
        //console.log("New notification received!",notification)
        if (notification.IsRead) return;
        toast({
          title: notification.Message,
          variant: "default",
        });
      });

      return () => {
        notificationsRef.off("value", handleSnapshot);
      };
    }
  }, [user]);

  function getNotificationsCount(notifications: any) {
    //console.log(notifications);
    return notifications.length;
  }

  function convertToDateReadableFormat(dateString: any) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  return (
    <DropdownMenu onOpenChange={markAllNotificationsAsRead}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
          <Bell className="shrink-0 text-black dark:text-white h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 h-96" align="end" forceMount>
        {getNotificationsCount(notifications) > 0 ? (
          <DropdownMenuLabel className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Notifications</div>
              <div className="text-sm font-semibold">
                {getNotificationsCount(notifications)}
              </div>
            </div>
            <div className="flex flex-col mt-2 overflow-y-auto">
              {notifications.map((notification: any) => (
                <div
                  key={notification.Id}
                  className="flex items-center justify-between p-2 border-b border-gray-200"
                >
                  <div className="w-72 text-sm font-normal">
                    {notification.Message}
                  </div>
                  <div className="text-xs font-normal text-gray-500">
                    {convertToDateReadableFormat(notification.CreatedAt)}
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuLabel>
        ) : (
          <DropdownMenuLabel className="flex items-center justify-center h-full font-normal">
            <div className="text-center">No Notifications Yet</div>
          </DropdownMenuLabel>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

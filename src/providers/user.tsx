"use client";

import { GatewayUser } from "@/lib/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  branchId: string;
  image: string;
  role: string;
}

export interface UserProviderValue {
  user: User;
  updateUser: (newValue: Partial<User>) => void;
}

const defaultUser: User = {
  id: "",
  name: "",
  email: "",
  branchId: "",
  image: "",
  role: "",
};

const defaultValue: UserProviderValue = {
  user: defaultUser,
  updateUser: () => {},
};

const UserContext = createContext<UserProviderValue>(defaultValue);

export const useUser = () => useContext(UserContext);

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: GatewayUser;
}) {
  const [currentUser, setCurrentUser] = useState<User>(
    user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          branchId: user.branchId,
          role: user.role,
        }
      : defaultUser
  );

  const updateUser = useCallback(
    (newValue: Partial<User>) => {
      setCurrentUser((old) => ({
        ...old,
        ...newValue,
      }));
    },
    [setCurrentUser]
  );

  const value = useMemo(
    () => ({ user: currentUser, updateUser }),
    [currentUser, updateUser]
  );

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     // check if already registered
  //     if (navigator.serviceWorker.controller) {
  //       //console.log('Service worker already registered');
  //       return;
  //     }
  //     navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //       .then((registration) => {
  //         registration?.active?.postMessage({ userId : user?.id });

  //         //console.log('Service Worker registered:', registration);
  //       })
  //       .catch((error) => {
  //         console.error('Service Worker registration failed:', error);
  //       });
  //   }
  // }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

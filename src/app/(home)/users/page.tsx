import React from "react";

import { Button } from "@/components/ui/button";

import { Metadata } from "next";
import { UsersDataTable } from "@/app/(home)/users/components/user-data-table";
import { getUsers, getBranches, getRoles } from "@/app/(home)/users/actions";
import { Card } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { UserModal } from "@/components/modals/user-modal";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage Users",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const { q: searchValue, branch } = searchParams as { [key: string]: string };

  const users = await getUsers({
    page: 1,
    keyword: searchValue,
    branchesIds: branch ? branch.split(",") : undefined,
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden p-5 w-full">
      <Card className="flex bg-white dark:bg-slate-950 w-full h-full overflow-hidden rounded-md flex-col p-4 gap-4">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">Users</h2>

          <UserModal>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="text-md">
                Add User
              </Button>
            </DialogTrigger>
          </UserModal>
        </div>
        <div className="w-full flex-1 overflow-y-hidden">
          <UsersDataTable data={users.users} total={users.total} />
        </div>
      </Card>
    </div>
  );
}

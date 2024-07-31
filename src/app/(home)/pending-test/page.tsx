import React from "react";

import { Metadata } from "next";
import { PendingTestCard } from "@/app/(home)/pending-test/components/pending-test-card";

export const metadata: Metadata = {
  title: "Pending Tests",
  description: "Manage trainees pending tests",
};

export default async function PendingTestPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  return (
    <div className="flex flex-col flex-1 p-5 w-full h-full overflow-hidden">
      <PendingTestCard searchParams={searchParams} />
    </div>
  );
}

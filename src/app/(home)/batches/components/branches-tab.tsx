"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUrl } from "@/lib/utils";
import { FilterPossibleValues } from "@/types/columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function BranchesTabs({
  activeBranch,
  branches,
}: {
  activeBranch: string;
  branches: FilterPossibleValues;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = useCallback(
    (newValue: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set("branch", newValue);

      router.push(createUrl(pathname, newParams));
    },
    [pathname, router, searchParams]
  );

  return (
    <Tabs value={activeBranch} activationMode="manual" onValueChange={onChange}>
      <TabsList>
        {branches.map((branch) => (
          <TabsTrigger key={branch.value} value={branch.value}>
            {branch.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

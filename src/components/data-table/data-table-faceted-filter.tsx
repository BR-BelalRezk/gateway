"use client";

import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn, createUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterPossibleValues } from "@/types/columns";
import { FacetedFilter } from "@/components/ui/faceted-filter";

interface DataTableFacetedFilter<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
}: DataTableFacetedFilter<TData, TValue>) {
  const [options, setOptions] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadOptions = async () => {
      const loadedOptions = await column?.columnDef.meta!.possibleValues!();
      setOptions(loadedOptions);
    };

    loadOptions();
  }, [column?.columnDef.meta]);

  return <FacetedFilter id={column.id} title={title} options={options} />;
}

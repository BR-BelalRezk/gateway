"use client";

import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { FacetedFilter } from "@/components/ui/faceted-filter";
import { FilterPossibleValues } from "@/types/columns";
import { getTypes } from "@/app/(home)/users/actions";
import { useUser } from "@/providers/user";
import { getLevels, getTrainers } from "@/app/(home)/pending-test/actions";

export function ClassFilterToolbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const isTrainer = user.role == "Trainer";

  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const isFiltered = useMemo(
    () => searchParams.toString().length > 0,
    [searchParams]
  );

  useEffect(() => {
    setSearchValue(searchParams?.get("q") || "");
  }, [searchParams, setSearchValue]);

  const [types, setTypes] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTypes = async () => {
      const loadedTypes = await getTypes();
      setTypes(loadedTypes);
    };

    loadTypes();
  }, []);

  const [levels, setLevels] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadLevels = async () => {
      const loadedLevels = await getLevels();
      setLevels(loadedLevels);
    };

    loadLevels();
  }, []);

  const [trainers, setTrainers] = useState<FilterPossibleValues>([]);
  useEffect(() => {
    const loadTrainers = async () => {
      const loadedTrainers = await getTrainers();
      setTrainers(loadedTrainers);
    };

    loadTrainers();
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl(pathname, newParams));
  }

  return (
    <div className="flex items-start justify-between py-2 px-1">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Filter..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </form>

        <FacetedFilter id="type" title="Type" options={types} />
        <FacetedFilter id="level" title="Level" options={levels} />
        {!isTrainer ? (
          <FacetedFilter id="trainer" title="Trainer" options={trainers} />
        ) : null}
        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => {
              router.push(pathname);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

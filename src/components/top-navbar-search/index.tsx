"use client";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useDeferredValue, useEffect, useState } from "react";
import { SearchTraineeByMobileNumber } from "@/app/(home)/wait-list/actions";
import { useDebounce } from "usehooks-ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function TopNavbarSearch() {
  const [isFocus, setIsFocus] = useState(false);

  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 500);

  const [traineeData, setTraineeData] = useState<any>(null);

  useEffect(() => {
    if (!isFocus) return;
    if (debouncedValue === "") {
      setTraineeData(null);
      return;
    }

    const searchTrainee = async () => {
      const result = await SearchTraineeByMobileNumber({
        mobileNumber: debouncedValue,
      });
      ////console.log("result", result);
      setTraineeData({
        FullName: "Jhon Doe",
        MobileNumber: "123456789",
        Status: "Pending",
      });
    };

    searchTrainee();
  }, [debouncedValue, isFocus]);

  return (
    <div>
      <Popover open={isFocus}>
        <PopoverAnchor asChild>
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </PopoverAnchor>
        <PopoverContent
          asChild
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="md:w-[100px] lg:w-[300px]"
          sideOffset={5}
        >
          {traineeData ? (
            <Link
              href="#"
              className="flex items-center justify-between space-x-4 hover:bg-muted"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/02.png" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {traineeData.FullName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {traineeData.MobileNumber}
                  </p>
                </div>
              </div>
              <p>{traineeData.Status}</p>
            </Link>
          ) : (
            <div className="w-full text-center">no trainee found</div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

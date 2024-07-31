import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { range } from "lodash-es";

export const DatePicker = ({
  id,
  value,
  onChange,
}: {
  id: string;
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          <div className="flex p-2 gap-2">
            <Select
              value={(selectedMonth.getMonth() + 1).toString()}
              onValueChange={(value) => {
                setSelectedMonth(
                  (prev) => new Date(prev.getFullYear(), parseInt(value) - 1, 1)
                );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedMonth.getFullYear().toString()}
              onValueChange={(value) => {
                setSelectedMonth(
                  (prev) => new Date(parseInt(value), prev.getMonth(), 1)
                );
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-52">
                {range(1950, new Date().getFullYear() + 1).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={value!}
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            onSelect={(value) => {
              onChange(value);
              setIsOpen(false);
            }}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

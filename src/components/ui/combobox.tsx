import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";

type ComboBoxOption = {
  label: string;
  value: string;
};

export const ComboBox = ({
  id,
  options,
  value,
  onChange,
  emptyText,
  placeholder,
  inputEmptyValue,
  multiple = false,
  isDisabled = false,
}: {
  id: string;
  options: ComboBoxOption[];
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  emptyText: string;
  placeholder: string;
  inputEmptyValue: string;
  multiple?: boolean;
  isDisabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            selectedValues.length === 0 && "text-muted-foreground"
          )}
          disabled={isDisabled}
        >
          {selectedValues.length !== 0
            ? selectedValues
                .map(
                  (selectedOption) =>
                    options.find((option) => option.value === selectedOption)
                      ?.label
                )
                .join(", ")
            : inputEmptyValue}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[var(--radix-popover-content-available-height)]"
        align="start"
      >
        <Command className="max-h-56">
          <CommandInput placeholder={placeholder} />
          {options.length === 0 ? (
            <div className="py-6 text-center text-sm">{emptyText}</div>
          ) : (
            <CommandEmpty>{emptyText}</CommandEmpty>
          )}

          {options.length > 0 ? (
            <CommandGroup className="overflow-auto">
              {options.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    if (multiple) {
                      if (selectedValues.includes(option.value)) {
                        onChange(
                          selectedValues.filter(
                            (selectedOption) => selectedOption !== option.value
                          )
                        );
                      } else {
                        onChange([...selectedValues, option.value]);
                      }
                    } else {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

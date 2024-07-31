import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyURLSearchParams } from "next/navigation";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const getCurrentTimeZone = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone == "Africa/Cairo") return "Europe/Sofia";

  return timeZone;

  // return "Europe/Sofia"
};

export const formatWithUserTimeZone = (date: Date, pattern: string) => {
  const timeZone = getCurrentTimeZone();
  return format(utcToZonedTime(date, timeZone), pattern);
};

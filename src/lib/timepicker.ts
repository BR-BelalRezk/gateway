import { useMemo } from "react";

import { addMinutes, endOfDay, format, isBefore, startOfDay } from "date-fns";

type generateTimeOptionsParams = {
  startFrom?: Date | null;
  minuteStep?: number;
  is24HrFormat?: boolean;
};

type TimeOption = {
  value: string;
  label: string;
};

function generateTimeOptions({
  startFrom = null,
  minuteStep = 30,
  is24HrFormat,
}: generateTimeOptionsParams = {}) {
  const options: { label: string; value: string }[] = [];
  const start = startFrom || startOfDay(new Date());
  const end = endOfDay(new Date());
  let current = start;

  while (isBefore(current, end)) {
    options.push(
      generateTimeOption({
        value: current,
        is24HrFormat,
      })
    );
    current = addMinutes(current, minuteStep);
  }

  return options;
}

function generateTimeOption({
  value,
  is24HrFormat = false,
}: {
  value: Date;
  is24HrFormat?: boolean;
}): TimeOption {
  return {
    /* generate date with reseted seconds/milleseconds to avoid missmatching between the generated
    and any provided value (e.g. startOfTheDay 00:00:00:00) to the TimePicker  */
    value: format(new Date(new Date(value).setSeconds(0, 0)), "HH:mm:ss"),
    label: format(value, is24HrFormat ? "H:mm" : "h:mm aa").toLocaleUpperCase(),
  };
}

export const useTimepickerOptions = ({
  minuteStep,
  startFrom,
  is24HrFormat = false,
}: generateTimeOptionsParams) =>
  useMemo(
    () =>
      generateTimeOptions({
        minuteStep,
        startFrom,
        is24HrFormat,
      }),
    [minuteStep, startFrom, is24HrFormat]
  );

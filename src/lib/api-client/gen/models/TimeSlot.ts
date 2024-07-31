import type { TimeSpan } from "./TimeSpan";

export type TimeSlot = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    startTime?: TimeSpan;
    endTime?: TimeSpan;
    /**
     * @type string | undefined
    */
    day1?: string | null;
    /**
     * @type string | undefined
    */
    day2?: string | null;
};

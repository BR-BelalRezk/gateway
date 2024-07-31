
export type TimeSpan = {
    /**
     * @type integer | undefined int64
    */
    ticks?: number;
    /**
     * @type integer | undefined int32
    */
    readonly days?: number;
    /**
     * @type integer | undefined int32
    */
    readonly hours?: number;
    /**
     * @type integer | undefined int32
    */
    readonly milliseconds?: number;
    /**
     * @type integer | undefined int32
    */
    readonly microseconds?: number;
    /**
     * @type integer | undefined int32
    */
    readonly nanoseconds?: number;
    /**
     * @type integer | undefined int32
    */
    readonly minutes?: number;
    /**
     * @type integer | undefined int32
    */
    readonly seconds?: number;
    /**
     * @type number | undefined double
    */
    readonly totalDays?: number;
    /**
     * @type number | undefined double
    */
    readonly totalHours?: number;
    /**
     * @type number | undefined double
    */
    readonly totalMilliseconds?: number;
    /**
     * @type number | undefined double
    */
    readonly totalMicroseconds?: number;
    /**
     * @type number | undefined double
    */
    readonly totalNanoseconds?: number;
    /**
     * @type number | undefined double
    */
    readonly totalMinutes?: number;
    /**
     * @type number | undefined double
    */
    readonly totalSeconds?: number;
};

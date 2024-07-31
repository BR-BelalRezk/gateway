import type { TimeSpan } from "./TimeSpan";

export type TraineeViewModel = {
    /**
     * @type string | undefined
    */
    fullName?: string | null;
    /**
     * @type string | undefined
    */
    mobile?: string | null;
    /**
     * @type string | undefined
    */
    birthdate?: string | null;
    /**
     * @type string | undefined
    */
    address?: string | null;
    /**
     * @type string | undefined
    */
    email?: string | null;
    /**
     * @type boolean | undefined
    */
    isDeleted?: boolean;
    /**
     * @type string | undefined
    */
    preferredDayForTest?: string | null;
    /**
     * @type string | undefined
    */
    followUpUserId?: string | null;
    /**
     * @type integer | undefined int32
    */
    timeSlotId?: number | null;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
    /**
     * @type integer | undefined int32
    */
    preferredSlotId?: number | null;
    /**
     * @type integer | undefined int32
    */
    secondPreferredSlotId?: number | null;
    /**
     * @type string | undefined
    */
    attendType?: string | null;
    /**
     * @type integer | undefined int32
    */
    levelId?: number | null;
    /**
     * @type string | undefined
    */
    status?: string | null;
    /**
     * @type string | undefined
    */
    notes?: string | null;
    /**
     * @type string | undefined
    */
    education?: string | null;
    /**
     * @type string | undefined
    */
    job?: string | null;
    /**
     * @type string | undefined date-time
    */
    testDate?: string;
    /**
     * @type integer | undefined int32
    */
    countryId?: number | null;
    /**
     * @type integer | undefined int32
    */
    cityId?: number | null;
    /**
     * @type integer | undefined int32
    */
    assignedTrainerId?: number | null;
    startTimeForTest?: TimeSpan;
};

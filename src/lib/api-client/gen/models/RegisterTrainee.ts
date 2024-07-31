import type { TimeSpan } from "./TimeSpan";

export type RegisterTrainee = {
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
    email?: string | null;
    /**
     * @type string | undefined
    */
    typeOfGender?: string | null;
    /**
     * @type string | undefined date-time
    */
    birthdate?: string | null;
    /**
     * @type string | undefined
    */
    preferredDayForTest?: string | null;
    startTimeForTest?: TimeSpan;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
    /**
     * @type string | undefined
    */
    attendType?: string | null;
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
     * @type integer | undefined int32
    */
    preferredSlotId?: number | null;
    /**
     * @type integer | undefined int32
    */
    secondPreferredSlotId?: number | null;
    /**
     * @type integer | undefined int32
    */
    countryId?: number;
    /**
     * @type integer | undefined int32
    */
    cityId?: number | null;
    /**
     * @type string | undefined
    */
    followUpUserId?: string | null;
    /**
     * @type string | undefined date-time
    */
    paymentDate?: string | null;
    /**
     * @type number | undefined double
    */
    paidValue?: number | null;
    /**
     * @type number | undefined double
    */
    remainingValue?: number | null;
    /**
     * @type string | undefined
    */
    paidStatus?: string | null;
    /**
     * @type string | undefined
    */
    paidType?: string | null;
    /**
     * @type integer | undefined int32
    */
    levelId?: number | null;
};

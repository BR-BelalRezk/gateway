import type { TimeSpan } from "./TimeSpan";
import type { TimeSlot } from "./TimeSlot";
import type { Branch } from "./Branch";
import type { Countries } from "./Countries";
import type { Cities } from "./Cities";
import type { Level } from "./Level";
import type { Trainer } from "./Trainer";
import type { ApplicationUser } from "./ApplicationUser";
import type { PaymentHistory } from "./PaymentHistory";

export type Trainee = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
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
    startTimeForTest?: TimeSpan;
    /**
     * @type boolean | undefined
    */
    isDeleted?: boolean;
    /**
     * @type string | undefined
    */
    preferredDayForTest?: string | null;
    /**
     * @type integer | undefined int32
    */
    preferredSlotId?: number | null;
    preferredSlot?: TimeSlot;
    /**
     * @type integer | undefined int32
    */
    secondPreferredSlotId?: number | null;
    secondPreferredSlot?: TimeSlot;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
    branch?: Branch;
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
    currentStatus?: string | null;
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
    testDate?: string | null;
    country?: Countries;
    /**
     * @type integer | undefined int32
    */
    countryId?: number;
    city?: Cities;
    /**
     * @type integer | undefined int32
    */
    cityId?: number | null;
    /**
     * @type string | undefined
    */
    typeOfGender?: string | null;
    level?: Level;
    /**
     * @type integer | undefined int32
    */
    assignedTrainerId?: number | null;
    assignedTrainer?: Trainer;
    /**
     * @type string | undefined
    */
    followUpUserId?: string | null;
    followUpUser?: ApplicationUser;
    /**
     * @type array | undefined
    */
    paymentHistory?: PaymentHistory[] | null;
};

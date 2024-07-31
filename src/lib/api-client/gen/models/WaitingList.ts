import type { Trainee } from "./Trainee";

export type WaitingList = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
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
    testNotes?: string | null;
    /**
     * @type string | undefined date-time
    */
    paymentDate?: string;
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
    trainee?: Trainee;
    /**
     * @type integer | undefined int32
    */
    traineeId?: number;
    /**
     * @type boolean | undefined
    */
    isDeleted?: boolean;
};


export type PaymentHistory = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
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
    /**
     * @type string | undefined
    */
    notes?: string | null;
    /**
     * @type integer | undefined int32
    */
    traineeId?: number;
};

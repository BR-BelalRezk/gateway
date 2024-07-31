import type { Branch } from "./Branch";

export type OtherBatches = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type string | undefined
    */
    name?: string | null;
    /**
     * @type string | undefined date-time
    */
    startDate?: string | null;
    /**
     * @type string | undefined date-time
    */
    endDate?: string | null;
    /**
     * @type boolean | undefined
    */
    isActive?: boolean;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
    branch?: Branch;
};

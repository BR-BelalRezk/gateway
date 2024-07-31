import type { Branch } from "./Branch";

export type Batch = {
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

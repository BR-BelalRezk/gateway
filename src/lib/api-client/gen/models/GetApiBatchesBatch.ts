import type { BatchWithClassCount } from "./BatchWithClassCount";

export type GetApiBatchesBatchQueryParams = {
    /**
     * @type string | undefined
    */
    branchId?: string;
};

/**
 * @description Success
*/
export type GetApiBatchesBatchQueryResponse = BatchWithClassCount[];

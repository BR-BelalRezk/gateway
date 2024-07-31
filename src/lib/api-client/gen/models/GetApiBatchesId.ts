import type { BatchWithClassCount } from "./BatchWithClassCount";

export type GetApiBatchesIdPathParams = {
    /**
     * @type string
    */
    id: string;
};

/**
 * @description Success
*/
export type GetApiBatchesIdQueryResponse = BatchWithClassCount[];

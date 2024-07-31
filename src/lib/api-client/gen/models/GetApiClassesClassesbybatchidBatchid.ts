import type { Class } from "./Class";

export type GetApiClassesClassesbybatchidBatchidPathParams = {
    /**
     * @type integer int32
    */
    BatchId: number;
};

export type GetApiClassesClassesbybatchidBatchidQueryParams = {
    /**
     * @type string | undefined
     * @default ''
    */
    keyword?: string;
    /**
     * @type string | undefined
     * @default ''
    */
    levels?: string;
    /**
     * @type string | undefined
     * @default ''
    */
    types?: string;
    /**
     * @type integer | undefined int32
     * @default 0
    */
    traineeId?: number;
};

/**
 * @description Success
*/
export type GetApiClassesClassesbybatchidBatchidQueryResponse = Class[];

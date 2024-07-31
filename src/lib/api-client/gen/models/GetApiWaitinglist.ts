import type { WaitingList } from "./WaitingList";

export type GetApiWaitinglistQueryParams = {
    /**
     * @type string | undefined
     * @default ''
    */
    keyword?: string;
    /**
     * @type string | undefined
     * @default ''
    */
    branches?: string;
    /**
     * @type string | undefined
     * @default ''
    */
    attendTypes?: string;
    /**
     * @type string | undefined
     * @default ''
    */
    levels?: string;
    /**
     * @type integer | undefined int32
     * @default 0
    */
    traineeId?: number;
    /**
     * @type integer | undefined int32
     * @default 1
    */
    page?: number;
    /**
     * @type integer | undefined int32
     * @default 10
    */
    pageSize?: number;
};

/**
 * @description Success
*/
export type GetApiWaitinglistQueryResponse = WaitingList[];

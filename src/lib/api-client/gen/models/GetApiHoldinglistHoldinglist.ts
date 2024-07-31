import type { HoldingList } from "./HoldingList";

export type GetApiHoldinglistHoldinglistQueryParams = {
    /**
     * @type string | undefined
     * @default ''
    */
    keyword?: string;
    /**
     * @type integer | undefined int32
     * @default 0
    */
    traineeId?: number;
};

/**
 * @description Success
*/
export type GetApiHoldinglistHoldinglistQueryResponse = HoldingList[];

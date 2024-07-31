import type { WaitingList } from "./WaitingList";

export type GetApiWaitinglistIdPathParams = {
    /**
     * @type integer int32
    */
    id: number;
};

/**
 * @description Success
*/
export type GetApiWaitinglistIdQueryResponse = WaitingList;

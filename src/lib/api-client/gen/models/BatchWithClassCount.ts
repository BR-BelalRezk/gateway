import type { Batch } from "./Batch";

export type BatchWithClassCount = {
    batch?: Batch;
    /**
     * @type integer | undefined int32
    */
    classCount?: number;
};


export type GetApiTraineeWaitingfortestQueryParams = {
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
    assignedTrainers?: string;
    /**
     * @type string | undefined
     * @default ''
    */
    assignedTrainersUsersIds?: string;
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

export type GetApiTraineeWaitingfortestQueryResponse = any | null;

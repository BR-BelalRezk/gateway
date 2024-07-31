
export type GetApiAuthenticateApiUsersQueryParams = {
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
    roles?: string;
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

export type GetApiAuthenticateApiUsersQueryResponse = any | null;

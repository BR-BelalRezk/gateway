
export type PutApiAuthenticateIdMutationRequest = {
    /**
     * @type string | undefined
    */
    UserName?: string;
    /**
     * @type string | undefined
    */
    Email?: string;
    /**
     * @type string | undefined
    */
    Role?: string;
    /**
     * @type integer | undefined int32
    */
    BranchId?: number;
    /**
     * @type string | undefined binary
    */
    file?: string;
};

export type PutApiAuthenticateIdMutationResponse = any | null;

export type PutApiAuthenticateIdPathParams = {
    /**
     * @type string
    */
    id: string;
};

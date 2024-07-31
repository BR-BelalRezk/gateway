
export type RegisterModel = {
    /**
     * @type string
    */
    username: string;
    /**
     * @type string email
    */
    email: string;
    /**
     * @type string
    */
    password: string;
    /**
     * @type string | undefined
    */
    role?: string | null;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
};

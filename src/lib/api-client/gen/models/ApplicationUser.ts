import type { Branch } from "./Branch";

export type ApplicationUser = {
    /**
     * @type string | undefined
    */
    id?: string | null;
    /**
     * @type string | undefined
    */
    userName?: string | null;
    /**
     * @type string | undefined
    */
    normalizedUserName?: string | null;
    /**
     * @type string | undefined
    */
    email?: string | null;
    /**
     * @type string | undefined
    */
    normalizedEmail?: string | null;
    /**
     * @type boolean | undefined
    */
    emailConfirmed?: boolean;
    /**
     * @type string | undefined
    */
    passwordHash?: string | null;
    /**
     * @type string | undefined
    */
    securityStamp?: string | null;
    /**
     * @type string | undefined
    */
    concurrencyStamp?: string | null;
    /**
     * @type string | undefined
    */
    phoneNumber?: string | null;
    /**
     * @type boolean | undefined
    */
    phoneNumberConfirmed?: boolean;
    /**
     * @type boolean | undefined
    */
    twoFactorEnabled?: boolean;
    /**
     * @type string | undefined date-time
    */
    lockoutEnd?: string | null;
    /**
     * @type boolean | undefined
    */
    lockoutEnabled?: boolean;
    /**
     * @type integer | undefined int32
    */
    accessFailedCount?: number;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
    branch?: Branch;
    /**
     * @type string | undefined
    */
    image?: string | null;
};

import type { Branch } from "./Branch";
import type { ApplicationUser } from "./ApplicationUser";

export type Trainer = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type integer | undefined int32
    */
    branchId?: number | null;
    branch?: Branch;
    /**
     * @type string | undefined
    */
    aspNetUserId?: string | null;
    aspNetUser?: ApplicationUser;
};

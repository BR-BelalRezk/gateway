import type { Countries } from "./Countries";

export type Cities = {
    /**
     * @type integer | undefined int32
    */
    id?: number;
    /**
     * @type string | undefined
    */
    name?: string | null;
    /**
     * @type integer | undefined int32
    */
    countryId?: number;
    country?: Countries;
};

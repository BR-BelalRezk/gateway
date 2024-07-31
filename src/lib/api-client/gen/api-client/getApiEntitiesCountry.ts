import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesCountryQueryResponse } from "../models/GetApiEntitiesCountry";

/**
     * @link /api/Entities/country
     */
export async function getApiEntitiesCountry (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesCountryQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesCountryQueryResponse>({
        method: "get",
        url: `/api/Entities/country`,
        ...options
    });
    
    return resData;
};
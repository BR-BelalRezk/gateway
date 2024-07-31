import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesCityQueryResponse, GetApiEntitiesCityQueryParams } from "../models/GetApiEntitiesCity";

/**
     * @link /api/Entities/city
     */
export async function getApiEntitiesCity (params?: GetApiEntitiesCityQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesCityQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesCityQueryResponse>({
        method: "get",
        url: `/api/Entities/city`,
        params,
        ...options
    });
    
    return resData;
};
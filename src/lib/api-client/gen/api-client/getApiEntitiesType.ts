import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesTypeQueryResponse } from "../models/GetApiEntitiesType";

/**
     * @link /api/Entities/type
     */
export async function getApiEntitiesType (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesTypeQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesTypeQueryResponse>({
        method: "get",
        url: `/api/Entities/type`,
        ...options
    });
    
    return resData;
};
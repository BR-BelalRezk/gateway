import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesLevelsQueryResponse } from "../models/GetApiEntitiesLevels";

/**
     * @link /api/Entities/levels
     */
export async function getApiEntitiesLevels (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesLevelsQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesLevelsQueryResponse>({
        method: "get",
        url: `/api/Entities/levels`,
        ...options
    });
    
    return resData;
};
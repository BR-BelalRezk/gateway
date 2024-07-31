import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesLevelsIdQueryResponse, GetApiEntitiesLevelsIdPathParams } from "../models/GetApiEntitiesLevelsId";

/**
     * @link /api/Entities/levels/:id
     */
export async function getApiEntitiesLevelsId (id: GetApiEntitiesLevelsIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesLevelsIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesLevelsIdQueryResponse>({
        method: "get",
        url: `/api/Entities/levels/${id}`,
        ...options
    });
    
    return resData;
};
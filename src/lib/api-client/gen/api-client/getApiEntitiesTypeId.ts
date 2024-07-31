import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesTypeIdQueryResponse, GetApiEntitiesTypeIdPathParams } from "../models/GetApiEntitiesTypeId";

/**
     * @link /api/Entities/type/:id
     */
export async function getApiEntitiesTypeId (id: GetApiEntitiesTypeIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesTypeIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesTypeIdQueryResponse>({
        method: "get",
        url: `/api/Entities/type/${id}`,
        ...options
    });
    
    return resData;
};
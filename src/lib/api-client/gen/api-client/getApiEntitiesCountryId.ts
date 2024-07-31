import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesCountryIdQueryResponse, GetApiEntitiesCountryIdPathParams } from "../models/GetApiEntitiesCountryId";

/**
     * @link /api/Entities/country/:id
     */
export async function getApiEntitiesCountryId (id: GetApiEntitiesCountryIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesCountryIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesCountryIdQueryResponse>({
        method: "get",
        url: `/api/Entities/country/${id}`,
        ...options
    });
    
    return resData;
};
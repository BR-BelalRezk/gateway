import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiClassesClassesIdQueryResponse, GetApiClassesClassesIdPathParams } from "../models/GetApiClassesClassesId";

/**
     * @link /api/Classes/Classes/:id
     */
export async function getApiClassesClassesId (id: GetApiClassesClassesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiClassesClassesIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiClassesClassesIdQueryResponse>({
        method: "get",
        url: `/api/Classes/Classes/${id}`,
        ...options
    });
    
    return resData;
};
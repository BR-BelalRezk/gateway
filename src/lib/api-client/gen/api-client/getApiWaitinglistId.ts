import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiWaitinglistIdQueryResponse, GetApiWaitinglistIdPathParams } from "../models/GetApiWaitinglistId";

/**
     * @link /api/waitinglist/:id
     */
export async function getApiWaitinglistId (id: GetApiWaitinglistIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiWaitinglistIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiWaitinglistIdQueryResponse>({
        method: "get",
        url: `/api/waitinglist/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiWaitinglistQueryResponse, GetApiWaitinglistQueryParams } from "../models/GetApiWaitinglist";

/**
     * @link /api/waitinglist
     */
export async function getApiWaitinglist (params?: GetApiWaitinglistQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiWaitinglistQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiWaitinglistQueryResponse>({
        method: "get",
        url: `/api/waitinglist`,
        params,
        ...options
    });
    
    return resData;
};
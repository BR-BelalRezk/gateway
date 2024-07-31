import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiHoldinglistHoldinglistQueryResponse, GetApiHoldinglistHoldinglistQueryParams } from "../models/GetApiHoldinglistHoldinglist";

/**
     * @link /api/HoldingList/HoldingList
     */
export async function getApiHoldinglistHoldinglist (params?: GetApiHoldinglistHoldinglistQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiHoldinglistHoldinglistQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiHoldinglistHoldinglistQueryResponse>({
        method: "get",
        url: `/api/HoldingList/HoldingList`,
        params,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiBatchesBatchQueryResponse, GetApiBatchesBatchQueryParams } from "../models/GetApiBatchesBatch";

/**
     * @link /api/Batches/Batch
     */
export async function getApiBatchesBatch (params?: GetApiBatchesBatchQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiBatchesBatchQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiBatchesBatchQueryResponse>({
        method: "get",
        url: `/api/Batches/Batch`,
        params,
        ...options
    });
    
    return resData;
};
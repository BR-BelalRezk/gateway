import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiOtherbatchesandclassesOtherbatchQueryResponse, GetApiOtherbatchesandclassesOtherbatchQueryParams } from "../models/GetApiOtherbatchesandclassesOtherbatch";

/**
     * @link /api/OtherBatchesAndClasses/OtherBatch
     */
export async function getApiOtherbatchesandclassesOtherbatch (params?: GetApiOtherbatchesandclassesOtherbatchQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiOtherbatchesandclassesOtherbatchQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiOtherbatchesandclassesOtherbatchQueryResponse>({
        method: "get",
        url: `/api/OtherBatchesAndClasses/OtherBatch`,
        params,
        ...options
    });
    
    return resData;
};
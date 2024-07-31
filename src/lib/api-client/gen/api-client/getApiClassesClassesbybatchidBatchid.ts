import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiClassesClassesbybatchidBatchidQueryResponse, GetApiClassesClassesbybatchidBatchidPathParams, GetApiClassesClassesbybatchidBatchidQueryParams } from "../models/GetApiClassesClassesbybatchidBatchid";

/**
     * @link /api/Classes/ClassesByBatchId/:BatchId
     */
export async function getApiClassesClassesbybatchidBatchid (batchId: GetApiClassesClassesbybatchidBatchidPathParams["BatchId"], params?: GetApiClassesClassesbybatchidBatchidQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiClassesClassesbybatchidBatchidQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiClassesClassesbybatchidBatchidQueryResponse>({
        method: "get",
        url: `/api/Classes/ClassesByBatchId/${batchId}`,
        params,
        ...options
    });
    
    return resData;
};
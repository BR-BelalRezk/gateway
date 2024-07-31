import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiOtherbatchesandclassesOtherclassesbybatchidBatchidQueryResponse, GetApiOtherbatchesandclassesOtherclassesbybatchidBatchidPathParams } from "../models/GetApiOtherbatchesandclassesOtherclassesbybatchidBatchid";

/**
     * @link /api/OtherBatchesAndClasses/OtherClassesByBatchId/:BatchId
     */
export async function getApiOtherbatchesandclassesOtherclassesbybatchidBatchid (batchId: GetApiOtherbatchesandclassesOtherclassesbybatchidBatchidPathParams["BatchId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiOtherbatchesandclassesOtherclassesbybatchidBatchidQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiOtherbatchesandclassesOtherclassesbybatchidBatchidQueryResponse>({
        method: "get",
        url: `/api/OtherBatchesAndClasses/OtherClassesByBatchId/${batchId}`,
        ...options
    });
    
    return resData;
};
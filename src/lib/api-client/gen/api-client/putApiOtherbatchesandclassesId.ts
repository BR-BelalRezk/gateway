import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiOtherbatchesandclassesIdMutationRequest, PutApiOtherbatchesandclassesIdMutationResponse, PutApiOtherbatchesandclassesIdPathParams } from "../models/PutApiOtherbatchesandclassesId";

/**
     * @link /api/OtherBatchesAndClasses/:id
     */
export async function putApiOtherbatchesandclassesId (id: PutApiOtherbatchesandclassesIdPathParams["id"], data?: PutApiOtherbatchesandclassesIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiOtherbatchesandclassesIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiOtherbatchesandclassesIdMutationResponse, PutApiOtherbatchesandclassesIdMutationRequest>({
        method: "put",
        url: `/api/OtherBatchesAndClasses/${id}`,
        data,
        ...options
    });
    
    return resData;
};
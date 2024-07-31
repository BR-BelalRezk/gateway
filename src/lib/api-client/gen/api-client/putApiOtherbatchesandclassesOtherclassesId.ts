import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiOtherbatchesandclassesOtherclassesIdMutationRequest, PutApiOtherbatchesandclassesOtherclassesIdMutationResponse, PutApiOtherbatchesandclassesOtherclassesIdPathParams } from "../models/PutApiOtherbatchesandclassesOtherclassesId";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses/:id
     */
export async function putApiOtherbatchesandclassesOtherclassesId (id: PutApiOtherbatchesandclassesOtherclassesIdPathParams["id"], data?: PutApiOtherbatchesandclassesOtherclassesIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiOtherbatchesandclassesOtherclassesIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiOtherbatchesandclassesOtherclassesIdMutationResponse, PutApiOtherbatchesandclassesOtherclassesIdMutationRequest>({
        method: "put",
        url: `/api/OtherBatchesAndClasses/OtherClasses/${id}`,
        data,
        ...options
    });
    
    return resData;
};
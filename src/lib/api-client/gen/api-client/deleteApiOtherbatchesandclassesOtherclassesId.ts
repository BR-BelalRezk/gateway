import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiOtherbatchesandclassesOtherclassesIdMutationResponse, DeleteApiOtherbatchesandclassesOtherclassesIdPathParams } from "../models/DeleteApiOtherbatchesandclassesOtherclassesId";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses/:id
     */
export async function deleteApiOtherbatchesandclassesOtherclassesId (id: DeleteApiOtherbatchesandclassesOtherclassesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiOtherbatchesandclassesOtherclassesIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiOtherbatchesandclassesOtherclassesIdMutationResponse>({
        method: "delete",
        url: `/api/OtherBatchesAndClasses/OtherClasses/${id}`,
        ...options
    });
    
    return resData;
};
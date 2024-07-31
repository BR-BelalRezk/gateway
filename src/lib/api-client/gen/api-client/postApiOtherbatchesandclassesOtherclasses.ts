import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiOtherbatchesandclassesOtherclassesMutationRequest, PostApiOtherbatchesandclassesOtherclassesMutationResponse } from "../models/PostApiOtherbatchesandclassesOtherclasses";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses
     */
export async function postApiOtherbatchesandclassesOtherclasses (data?: PostApiOtherbatchesandclassesOtherclassesMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiOtherbatchesandclassesOtherclassesMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiOtherbatchesandclassesOtherclassesMutationResponse, PostApiOtherbatchesandclassesOtherclassesMutationRequest>({
        method: "post",
        url: `/api/OtherBatchesAndClasses/OtherClasses`,
        data,
        ...options
    });
    
    return resData;
};
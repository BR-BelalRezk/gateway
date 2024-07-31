import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiOtherbatchesandclassesOtherbatchMutationRequest, PostApiOtherbatchesandclassesOtherbatchMutationResponse } from "../models/PostApiOtherbatchesandclassesOtherbatch";

/**
     * @link /api/OtherBatchesAndClasses/OtherBatch
     */
export async function postApiOtherbatchesandclassesOtherbatch (data?: PostApiOtherbatchesandclassesOtherbatchMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiOtherbatchesandclassesOtherbatchMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiOtherbatchesandclassesOtherbatchMutationResponse, PostApiOtherbatchesandclassesOtherbatchMutationRequest>({
        method: "post",
        url: `/api/OtherBatchesAndClasses/OtherBatch`,
        data,
        ...options
    });
    
    return resData;
};
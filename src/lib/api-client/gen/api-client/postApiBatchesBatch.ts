import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiBatchesBatchMutationRequest, PostApiBatchesBatchMutationResponse } from "../models/PostApiBatchesBatch";

/**
     * @link /api/Batches/Batch
     */
export async function postApiBatchesBatch (data?: PostApiBatchesBatchMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiBatchesBatchMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiBatchesBatchMutationResponse, PostApiBatchesBatchMutationRequest>({
        method: "post",
        url: `/api/Batches/Batch`,
        data,
        ...options
    });
    
    return resData;
};
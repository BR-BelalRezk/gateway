import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiBatchesEndbatchIdMutationResponse, PostApiBatchesEndbatchIdPathParams } from "../models/PostApiBatchesEndbatchId";

/**
     * @link /api/Batches/EndBatch/:id
     */
export async function postApiBatchesEndbatchId (id: PostApiBatchesEndbatchIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiBatchesEndbatchIdMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiBatchesEndbatchIdMutationResponse>({
        method: "post",
        url: `/api/Batches/EndBatch/${id}`,
        ...options
    });
    
    return resData;
};
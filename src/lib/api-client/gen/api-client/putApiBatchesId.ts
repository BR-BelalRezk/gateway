import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiBatchesIdMutationRequest, PutApiBatchesIdMutationResponse, PutApiBatchesIdPathParams } from "../models/PutApiBatchesId";

/**
     * @link /api/Batches/:id
     */
export async function putApiBatchesId (id: PutApiBatchesIdPathParams["id"], data?: PutApiBatchesIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiBatchesIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiBatchesIdMutationResponse, PutApiBatchesIdMutationRequest>({
        method: "put",
        url: `/api/Batches/${id}`,
        data,
        ...options
    });
    
    return resData;
};
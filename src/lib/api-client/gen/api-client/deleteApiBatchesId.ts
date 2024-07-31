import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiBatchesIdMutationResponse, DeleteApiBatchesIdPathParams } from "../models/DeleteApiBatchesId";

/**
     * @link /api/Batches/:id
     */
export async function deleteApiBatchesId (id: DeleteApiBatchesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiBatchesIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiBatchesIdMutationResponse>({
        method: "delete",
        url: `/api/Batches/${id}`,
        ...options
    });
    
    return resData;
};
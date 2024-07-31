import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiWaitinglistIdMutationResponse, DeleteApiWaitinglistIdPathParams } from "../models/DeleteApiWaitinglistId";

/**
     * @link /api/waitinglist/:id
     */
export async function deleteApiWaitinglistId (id: DeleteApiWaitinglistIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiWaitinglistIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiWaitinglistIdMutationResponse>({
        method: "delete",
        url: `/api/waitinglist/${id}`,
        ...options
    });
    
    return resData;
};
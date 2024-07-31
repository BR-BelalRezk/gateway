import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiWaitinglistEditIdMutationRequest, PutApiWaitinglistEditIdMutationResponse, PutApiWaitinglistEditIdPathParams } from "../models/PutApiWaitinglistEditId";

/**
     * @link /api/waitinglist/edit/:id
     */
export async function putApiWaitinglistEditId (id: PutApiWaitinglistEditIdPathParams["id"], data?: PutApiWaitinglistEditIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiWaitinglistEditIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiWaitinglistEditIdMutationResponse, PutApiWaitinglistEditIdMutationRequest>({
        method: "put",
        url: `/api/waitinglist/edit/${id}`,
        data,
        ...options
    });
    
    return resData;
};
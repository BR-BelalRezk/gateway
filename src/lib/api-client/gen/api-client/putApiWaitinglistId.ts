import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiWaitinglistIdMutationResponse, PutApiWaitinglistIdPathParams, PutApiWaitinglistIdQueryParams } from "../models/PutApiWaitinglistId";

/**
     * @link /api/waitinglist/:id
     */
export async function putApiWaitinglistId (id: PutApiWaitinglistIdPathParams["Id"], params?: PutApiWaitinglistIdQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiWaitinglistIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiWaitinglistIdMutationResponse>({
        method: "put",
        url: `/api/waitinglist/${id}`,
        params,
        ...options
    });
    
    return resData;
};
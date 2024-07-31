import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiBatchesIdQueryResponse, GetApiBatchesIdPathParams } from "../models/GetApiBatchesId";

/**
     * @link /api/Batches/:id
     */
export async function getApiBatchesId (id: GetApiBatchesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiBatchesIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiBatchesIdQueryResponse>({
        method: "get",
        url: `/api/Batches/${id}`,
        ...options
    });
    
    return resData;
};
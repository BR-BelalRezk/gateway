import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiClassesClassesIdMutationResponse, DeleteApiClassesClassesIdPathParams } from "../models/DeleteApiClassesClassesId";

/**
     * @link /api/Classes/Classes/:id
     */
export async function deleteApiClassesClassesId (id: DeleteApiClassesClassesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiClassesClassesIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiClassesClassesIdMutationResponse>({
        method: "delete",
        url: `/api/Classes/Classes/${id}`,
        ...options
    });
    
    return resData;
};
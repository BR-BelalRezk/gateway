import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiEntitiesTypeIdMutationResponse, DeleteApiEntitiesTypeIdPathParams } from "../models/DeleteApiEntitiesTypeId";

/**
     * @link /api/Entities/type/:id
     */
export async function deleteApiEntitiesTypeId (id: DeleteApiEntitiesTypeIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiEntitiesTypeIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiEntitiesTypeIdMutationResponse>({
        method: "delete",
        url: `/api/Entities/type/${id}`,
        ...options
    });
    
    return resData;
};
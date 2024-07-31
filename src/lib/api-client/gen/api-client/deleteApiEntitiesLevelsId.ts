import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiEntitiesLevelsIdMutationResponse, DeleteApiEntitiesLevelsIdPathParams } from "../models/DeleteApiEntitiesLevelsId";

/**
     * @link /api/Entities/levels/:id
     */
export async function deleteApiEntitiesLevelsId (id: DeleteApiEntitiesLevelsIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiEntitiesLevelsIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiEntitiesLevelsIdMutationResponse>({
        method: "delete",
        url: `/api/Entities/levels/${id}`,
        ...options
    });
    
    return resData;
};
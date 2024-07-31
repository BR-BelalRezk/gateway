import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiEntitiesBranchesIdMutationResponse, DeleteApiEntitiesBranchesIdPathParams } from "../models/DeleteApiEntitiesBranchesId";

/**
     * @link /api/Entities/branches/:id
     */
export async function deleteApiEntitiesBranchesId (id: DeleteApiEntitiesBranchesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiEntitiesBranchesIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiEntitiesBranchesIdMutationResponse>({
        method: "delete",
        url: `/api/Entities/branches/${id}`,
        ...options
    });
    
    return resData;
};
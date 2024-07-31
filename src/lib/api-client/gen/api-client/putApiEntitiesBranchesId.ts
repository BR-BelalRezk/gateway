import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesBranchesIdMutationRequest, PutApiEntitiesBranchesIdMutationResponse, PutApiEntitiesBranchesIdPathParams } from "../models/PutApiEntitiesBranchesId";

/**
     * @link /api/Entities/branches/:id
     */
export async function putApiEntitiesBranchesId (id: PutApiEntitiesBranchesIdPathParams["id"], data?: PutApiEntitiesBranchesIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesBranchesIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesBranchesIdMutationResponse, PutApiEntitiesBranchesIdMutationRequest>({
        method: "put",
        url: `/api/Entities/branches/${id}`,
        data,
        ...options
    });
    
    return resData;
};
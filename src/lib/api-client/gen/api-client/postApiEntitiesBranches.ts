import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesBranchesMutationRequest, PostApiEntitiesBranchesMutationResponse } from "../models/PostApiEntitiesBranches";

/**
     * @link /api/Entities/branches
     */
export async function postApiEntitiesBranches (data?: PostApiEntitiesBranchesMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesBranchesMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesBranchesMutationResponse, PostApiEntitiesBranchesMutationRequest>({
        method: "post",
        url: `/api/Entities/branches`,
        data,
        ...options
    });
    
    return resData;
};
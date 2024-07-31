import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesLevelsMutationRequest, PostApiEntitiesLevelsMutationResponse } from "../models/PostApiEntitiesLevels";

/**
     * @link /api/Entities/levels
     */
export async function postApiEntitiesLevels (data?: PostApiEntitiesLevelsMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesLevelsMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesLevelsMutationResponse, PostApiEntitiesLevelsMutationRequest>({
        method: "post",
        url: `/api/Entities/levels`,
        data,
        ...options
    });
    
    return resData;
};
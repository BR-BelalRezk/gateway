import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesTypeMutationRequest, PostApiEntitiesTypeMutationResponse } from "../models/PostApiEntitiesType";

/**
     * @link /api/Entities/type
     */
export async function postApiEntitiesType (data?: PostApiEntitiesTypeMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesTypeMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesTypeMutationResponse, PostApiEntitiesTypeMutationRequest>({
        method: "post",
        url: `/api/Entities/type`,
        data,
        ...options
    });
    
    return resData;
};
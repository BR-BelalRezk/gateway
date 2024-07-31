import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiClassesClassesMutationRequest, PostApiClassesClassesMutationResponse } from "../models/PostApiClassesClasses";

/**
     * @link /api/Classes/Classes
     */
export async function postApiClassesClasses (data?: PostApiClassesClassesMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiClassesClassesMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiClassesClassesMutationResponse, PostApiClassesClassesMutationRequest>({
        method: "post",
        url: `/api/Classes/Classes`,
        data,
        ...options
    });
    
    return resData;
};
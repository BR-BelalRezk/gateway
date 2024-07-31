import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiTraineeMutationRequest, PostApiTraineeMutationResponse } from "../models/PostApiTrainee";

/**
     * @link /api/Trainee
     */
export async function postApiTrainee (data?: PostApiTraineeMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiTraineeMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiTraineeMutationResponse, PostApiTraineeMutationRequest>({
        method: "post",
        url: `/api/Trainee`,
        data,
        ...options
    });
    
    return resData;
};
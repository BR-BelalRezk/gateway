import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiTraineeAddtrineelevelMutationRequest, PostApiTraineeAddtrineelevelMutationResponse } from "../models/PostApiTraineeAddtrineelevel";

/**
     * @link /api/Trainee/AddTrineeLevel
     */
export async function postApiTraineeAddtrineelevel (data?: PostApiTraineeAddtrineelevelMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiTraineeAddtrineelevelMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiTraineeAddtrineelevelMutationResponse, PostApiTraineeAddtrineelevelMutationRequest>({
        method: "post",
        url: `/api/Trainee/AddTrineeLevel`,
        data,
        ...options
    });
    
    return resData;
};
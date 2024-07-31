import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiTraineeAssignTrainerMutationRequest, PostApiTraineeAssignTrainerMutationResponse } from "../models/PostApiTraineeAssignTrainer";

/**
     * @link /api/Trainee/assign-trainer
     */
export async function postApiTraineeAssignTrainer (data?: PostApiTraineeAssignTrainerMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiTraineeAssignTrainerMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiTraineeAssignTrainerMutationResponse, PostApiTraineeAssignTrainerMutationRequest>({
        method: "post",
        url: `/api/Trainee/assign-trainer`,
        data,
        ...options
    });
    
    return resData;
};
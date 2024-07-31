import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiClassesClassesClassidAddtraineeTraineeidMutationResponse, PostApiClassesClassesClassidAddtraineeTraineeidPathParams } from "../models/PostApiClassesClassesClassidAddtraineeTraineeid";

/**
     * @link /api/Classes/Classes/:classId/AddTrainee/:traineeId
     */
export async function postApiClassesClassesClassidAddtraineeTraineeid (classId: PostApiClassesClassesClassidAddtraineeTraineeidPathParams["classId"], traineeId: PostApiClassesClassesClassidAddtraineeTraineeidPathParams["traineeId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiClassesClassesClassidAddtraineeTraineeidMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiClassesClassesClassidAddtraineeTraineeidMutationResponse>({
        method: "post",
        url: `/api/Classes/Classes/${classId}/AddTrainee/${traineeId}`,
        ...options
    });
    
    return resData;
};
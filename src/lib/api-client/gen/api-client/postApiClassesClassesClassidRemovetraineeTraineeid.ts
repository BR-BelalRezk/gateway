import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiClassesClassesClassidRemovetraineeTraineeidMutationResponse, PostApiClassesClassesClassidRemovetraineeTraineeidPathParams } from "../models/PostApiClassesClassesClassidRemovetraineeTraineeid";

/**
     * @link /api/Classes/Classes/:classId/RemoveTrainee/:traineeId
     */
export async function postApiClassesClassesClassidRemovetraineeTraineeid (classId: PostApiClassesClassesClassidRemovetraineeTraineeidPathParams["classId"], traineeId: PostApiClassesClassesClassidRemovetraineeTraineeidPathParams["traineeId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiClassesClassesClassidRemovetraineeTraineeidMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiClassesClassesClassidRemovetraineeTraineeidMutationResponse>({
        method: "post",
        url: `/api/Classes/Classes/${classId}/RemoveTrainee/${traineeId}`,
        ...options
    });
    
    return resData;
};
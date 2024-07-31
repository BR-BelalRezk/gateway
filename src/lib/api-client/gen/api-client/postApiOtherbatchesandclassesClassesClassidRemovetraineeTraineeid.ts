import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeidMutationResponse, PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeidPathParams } from "../models/PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeid";

/**
     * @link /api/OtherBatchesAndClasses/Classes/:classId/RemoveTrainee/:traineeId
     */
export async function postApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeid (classId: PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeidPathParams["classId"], traineeId: PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeidPathParams["traineeId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeidMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiOtherbatchesandclassesClassesClassidRemovetraineeTraineeidMutationResponse>({
        method: "post",
        url: `/api/OtherBatchesAndClasses/Classes/${classId}/RemoveTrainee/${traineeId}`,
        ...options
    });
    
    return resData;
};
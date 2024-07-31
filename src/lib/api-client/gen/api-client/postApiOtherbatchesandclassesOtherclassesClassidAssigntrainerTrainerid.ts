import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTraineridMutationResponse, PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTraineridPathParams } from "../models/PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTrainerid";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses/:classId/AssignTrainer/:trainerId
     */
export async function postApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTrainerid (classId: PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTraineridPathParams["classId"], trainerId: PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTraineridPathParams["trainerId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTraineridMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiOtherbatchesandclassesOtherclassesClassidAssigntrainerTraineridMutationResponse>({
        method: "post",
        url: `/api/OtherBatchesAndClasses/OtherClasses/${classId}/AssignTrainer/${trainerId}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidMutationResponse, PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidPathParams, PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidQueryParams } from "../models/PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeid";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses/:classId/AddTrainee/:traineeId
     */
export async function postApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeid (classId: PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidPathParams["classId"], traineeId: PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidPathParams["traineeId"], params?: PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiOtherbatchesandclassesOtherclassesClassidAddtraineeTraineeidMutationResponse>({
        method: "post",
        url: `/api/OtherBatchesAndClasses/OtherClasses/${classId}/AddTrainee/${traineeId}`,
        params,
        ...options
    });
    
    return resData;
};
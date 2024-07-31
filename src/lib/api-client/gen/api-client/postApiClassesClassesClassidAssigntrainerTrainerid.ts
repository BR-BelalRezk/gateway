import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiClassesClassesClassidAssigntrainerTraineridMutationResponse, PostApiClassesClassesClassidAssigntrainerTraineridPathParams } from "../models/PostApiClassesClassesClassidAssigntrainerTrainerid";

/**
     * @link /api/Classes/Classes/:classId/AssignTrainer/:trainerId
     */
export async function postApiClassesClassesClassidAssigntrainerTrainerid (classId: PostApiClassesClassesClassidAssigntrainerTraineridPathParams["classId"], trainerId: PostApiClassesClassesClassidAssigntrainerTraineridPathParams["trainerId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiClassesClassesClassidAssigntrainerTraineridMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiClassesClassesClassidAssigntrainerTraineridMutationResponse>({
        method: "post",
        url: `/api/Classes/Classes/${classId}/AssignTrainer/${trainerId}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiClassesClassesClassidSwitchclassTraineeidMutationResponse, PostApiClassesClassesClassidSwitchclassTraineeidPathParams } from "../models/PostApiClassesClassesClassidSwitchclassTraineeid";

/**
     * @link /api/Classes/Classes/:classId/SwitchClass/:traineeId
     */
export async function postApiClassesClassesClassidSwitchclassTraineeid (classId: PostApiClassesClassesClassidSwitchclassTraineeidPathParams["classId"], traineeId: PostApiClassesClassesClassidSwitchclassTraineeidPathParams["traineeId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiClassesClassesClassidSwitchclassTraineeidMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiClassesClassesClassidSwitchclassTraineeidMutationResponse>({
        method: "post",
        url: `/api/Classes/Classes/${classId}/SwitchClass/${traineeId}`,
        ...options
    });
    
    return resData;
};
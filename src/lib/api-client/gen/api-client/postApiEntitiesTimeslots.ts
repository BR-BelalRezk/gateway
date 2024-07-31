import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesTimeslotsMutationRequest, PostApiEntitiesTimeslotsMutationResponse } from "../models/PostApiEntitiesTimeslots";

/**
     * @link /api/Entities/timeslots
     */
export async function postApiEntitiesTimeslots (data?: PostApiEntitiesTimeslotsMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesTimeslotsMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesTimeslotsMutationResponse, PostApiEntitiesTimeslotsMutationRequest>({
        method: "post",
        url: `/api/Entities/timeslots`,
        data,
        ...options
    });
    
    return resData;
};
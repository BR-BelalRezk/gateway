import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesRoomsMutationRequest, PostApiEntitiesRoomsMutationResponse } from "../models/PostApiEntitiesRooms";

/**
     * @link /api/Entities/rooms
     */
export async function postApiEntitiesRooms (data?: PostApiEntitiesRoomsMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesRoomsMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesRoomsMutationResponse, PostApiEntitiesRoomsMutationRequest>({
        method: "post",
        url: `/api/Entities/rooms`,
        data,
        ...options
    });
    
    return resData;
};
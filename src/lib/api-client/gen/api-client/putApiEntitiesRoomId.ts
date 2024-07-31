import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesRoomIdMutationRequest, PutApiEntitiesRoomIdMutationResponse, PutApiEntitiesRoomIdPathParams } from "../models/PutApiEntitiesRoomId";

/**
     * @link /api/Entities/room/:id
     */
export async function putApiEntitiesRoomId (id: PutApiEntitiesRoomIdPathParams["id"], data?: PutApiEntitiesRoomIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesRoomIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesRoomIdMutationResponse, PutApiEntitiesRoomIdMutationRequest>({
        method: "put",
        url: `/api/Entities/room/${id}`,
        data,
        ...options
    });
    
    return resData;
};
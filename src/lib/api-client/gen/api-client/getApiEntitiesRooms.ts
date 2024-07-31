import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesRoomsQueryResponse } from "../models/GetApiEntitiesRooms";

/**
     * @link /api/Entities/rooms
     */
export async function getApiEntitiesRooms (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesRoomsQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesRoomsQueryResponse>({
        method: "get",
        url: `/api/Entities/rooms`,
        ...options
    });
    
    return resData;
};
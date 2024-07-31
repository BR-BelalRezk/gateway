import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesNotesIdQueryResponse, GetApiEntitiesNotesIdPathParams } from "../models/GetApiEntitiesNotesId";

/**
     * @link /api/Entities/notes/:id
     */
export async function getApiEntitiesNotesId (id: GetApiEntitiesNotesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesNotesIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesNotesIdQueryResponse>({
        method: "get",
        url: `/api/Entities/notes/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiEntitiesNotesIdMutationResponse, DeleteApiEntitiesNotesIdPathParams } from "../models/DeleteApiEntitiesNotesId";

/**
     * @link /api/Entities/notes/:id
     */
export async function deleteApiEntitiesNotesId (id: DeleteApiEntitiesNotesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiEntitiesNotesIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiEntitiesNotesIdMutationResponse>({
        method: "delete",
        url: `/api/Entities/notes/${id}`,
        ...options
    });
    
    return resData;
};
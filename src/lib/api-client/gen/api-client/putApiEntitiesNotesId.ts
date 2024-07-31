import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesNotesIdMutationRequest, PutApiEntitiesNotesIdMutationResponse, PutApiEntitiesNotesIdPathParams } from "../models/PutApiEntitiesNotesId";

/**
     * @link /api/Entities/notes/:id
     */
export async function putApiEntitiesNotesId (id: PutApiEntitiesNotesIdPathParams["id"], data?: PutApiEntitiesNotesIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesNotesIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesNotesIdMutationResponse, PutApiEntitiesNotesIdMutationRequest>({
        method: "put",
        url: `/api/Entities/notes/${id}`,
        data,
        ...options
    });
    
    return resData;
};
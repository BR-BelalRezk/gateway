import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesNotesMutationRequest, PostApiEntitiesNotesMutationResponse } from "../models/PostApiEntitiesNotes";

/**
     * @link /api/Entities/notes
     */
export async function postApiEntitiesNotes (data?: PostApiEntitiesNotesMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesNotesMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesNotesMutationResponse, PostApiEntitiesNotesMutationRequest>({
        method: "post",
        url: `/api/Entities/notes`,
        data,
        ...options
    });
    
    return resData;
};
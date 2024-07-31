import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesNotesQueryResponse } from "../models/GetApiEntitiesNotes";

/**
     * @link /api/Entities/notes
     */
export async function getApiEntitiesNotes (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesNotesQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesNotesQueryResponse>({
        method: "get",
        url: `/api/Entities/notes`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiEntitiesTimeslotsIdMutationResponse, DeleteApiEntitiesTimeslotsIdPathParams } from "../models/DeleteApiEntitiesTimeslotsId";

/**
     * @link /api/Entities/timeslots/:id
     */
export async function deleteApiEntitiesTimeslotsId (id: DeleteApiEntitiesTimeslotsIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiEntitiesTimeslotsIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiEntitiesTimeslotsIdMutationResponse>({
        method: "delete",
        url: `/api/Entities/timeslots/${id}`,
        ...options
    });
    
    return resData;
};
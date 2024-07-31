import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesTimeslotsIdMutationRequest, PutApiEntitiesTimeslotsIdMutationResponse, PutApiEntitiesTimeslotsIdPathParams } from "../models/PutApiEntitiesTimeslotsId";

/**
     * @link /api/Entities/timeslots/:id
     */
export async function putApiEntitiesTimeslotsId (id: PutApiEntitiesTimeslotsIdPathParams["id"], data?: PutApiEntitiesTimeslotsIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesTimeslotsIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesTimeslotsIdMutationResponse, PutApiEntitiesTimeslotsIdMutationRequest>({
        method: "put",
        url: `/api/Entities/timeslots/${id}`,
        data,
        ...options
    });
    
    return resData;
};
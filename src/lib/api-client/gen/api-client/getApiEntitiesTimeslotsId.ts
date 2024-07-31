import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesTimeslotsIdQueryResponse, GetApiEntitiesTimeslotsIdPathParams } from "../models/GetApiEntitiesTimeslotsId";

/**
     * @link /api/Entities/timeslots/:id
     */
export async function getApiEntitiesTimeslotsId (id: GetApiEntitiesTimeslotsIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesTimeslotsIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesTimeslotsIdQueryResponse>({
        method: "get",
        url: `/api/Entities/timeslots/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesTimeslotsQueryResponse } from "../models/GetApiEntitiesTimeslots";

/**
     * @link /api/Entities/timeslots
     */
export async function getApiEntitiesTimeslots (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesTimeslotsQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesTimeslotsQueryResponse>({
        method: "get",
        url: `/api/Entities/timeslots`,
        ...options
    });
    
    return resData;
};
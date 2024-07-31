import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiTraineeWaitingfortestQueryResponse, GetApiTraineeWaitingfortestQueryParams } from "../models/GetApiTraineeWaitingfortest";

/**
     * @link /api/Trainee/WaitingForTest
     */
export async function getApiTraineeWaitingfortest (params?: GetApiTraineeWaitingfortestQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiTraineeWaitingfortestQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiTraineeWaitingfortestQueryResponse>({
        method: "get",
        url: `/api/Trainee/WaitingForTest`,
        params,
        ...options
    });
    
    return resData;
};
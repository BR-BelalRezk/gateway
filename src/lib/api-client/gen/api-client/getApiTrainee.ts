import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiTraineeQueryResponse } from "../models/GetApiTrainee";

/**
     * @link /api/Trainee
     */
export async function getApiTrainee (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiTraineeQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiTraineeQueryResponse>({
        method: "get",
        url: `/api/Trainee`,
        ...options
    });
    
    return resData;
};
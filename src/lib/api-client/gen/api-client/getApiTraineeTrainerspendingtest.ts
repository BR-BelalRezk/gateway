import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiTraineeTrainerspendingtestQueryResponse, GetApiTraineeTrainerspendingtestQueryParams } from "../models/GetApiTraineeTrainerspendingtest";

/**
     * @link /api/Trainee/trainersPendingTest
     */
export async function getApiTraineeTrainerspendingtest (params?: GetApiTraineeTrainerspendingtestQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiTraineeTrainerspendingtestQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiTraineeTrainerspendingtestQueryResponse>({
        method: "get",
        url: `/api/Trainee/trainersPendingTest`,
        params,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiTraineeTrainersQueryResponse } from "../models/GetApiTraineeTrainers";

/**
     * @link /api/Trainee/trainers
     */
export async function getApiTraineeTrainers (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiTraineeTrainersQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiTraineeTrainersQueryResponse>({
        method: "get",
        url: `/api/Trainee/trainers`,
        ...options
    });
    
    return resData;
};
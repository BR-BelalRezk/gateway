import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiTraineeSearchtraineebyphoneQueryResponse, GetApiTraineeSearchtraineebyphoneQueryParams } from "../models/GetApiTraineeSearchtraineebyphone";

/**
     * @link /api/Trainee/SearchTraineeByPhone
     */
export async function getApiTraineeSearchtraineebyphone (params?: GetApiTraineeSearchtraineebyphoneQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiTraineeSearchtraineebyphoneQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiTraineeSearchtraineebyphoneQueryResponse>({
        method: "get",
        url: `/api/Trainee/SearchTraineeByPhone`,
        params,
        ...options
    });
    
    return resData;
};
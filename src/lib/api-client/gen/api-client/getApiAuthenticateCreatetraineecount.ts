import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAuthenticateCreatetraineecountQueryResponse } from "../models/GetApiAuthenticateCreatetraineecount";

/**
     * @link /api/Authenticate/CreateTraineeCount
     */
export async function getApiAuthenticateCreatetraineecount (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAuthenticateCreatetraineecountQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAuthenticateCreatetraineecountQueryResponse>({
        method: "get",
        url: `/api/Authenticate/CreateTraineeCount`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAuthenticateMyinformationQueryResponse } from "../models/GetApiAuthenticateMyinformation";

/**
     * @link /api/Authenticate/myInformation
     */
export async function getApiAuthenticateMyinformation (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAuthenticateMyinformationQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAuthenticateMyinformationQueryResponse>({
        method: "get",
        url: `/api/Authenticate/myInformation`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAuthenticateApiUsersQueryResponse, GetApiAuthenticateApiUsersQueryParams } from "../models/GetApiAuthenticateApiUsers";

/**
     * @link /api/Authenticate/api/users
     */
export async function getApiAuthenticateApiUsers (params?: GetApiAuthenticateApiUsersQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAuthenticateApiUsersQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAuthenticateApiUsersQueryResponse>({
        method: "get",
        url: `/api/Authenticate/api/users`,
        params,
        ...options
    });
    
    return resData;
};
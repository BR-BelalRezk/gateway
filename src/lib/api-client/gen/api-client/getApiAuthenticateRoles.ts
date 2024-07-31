import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAuthenticateRolesQueryResponse } from "../models/GetApiAuthenticateRoles";

/**
     * @link /api/Authenticate/roles
     */
export async function getApiAuthenticateRoles (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAuthenticateRolesQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAuthenticateRolesQueryResponse>({
        method: "get",
        url: `/api/Authenticate/roles`,
        ...options
    });
    
    return resData;
};
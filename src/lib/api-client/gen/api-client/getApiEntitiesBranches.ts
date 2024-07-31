import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesBranchesQueryResponse } from "../models/GetApiEntitiesBranches";

/**
     * @link /api/Entities/branches
     */
export async function getApiEntitiesBranches (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesBranchesQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesBranchesQueryResponse>({
        method: "get",
        url: `/api/Entities/branches`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiEntitiesBranchesIdQueryResponse, GetApiEntitiesBranchesIdPathParams } from "../models/GetApiEntitiesBranchesId";

/**
     * @link /api/Entities/branches/:id
     */
export async function getApiEntitiesBranchesId (id: GetApiEntitiesBranchesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiEntitiesBranchesIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiEntitiesBranchesIdQueryResponse>({
        method: "get",
        url: `/api/Entities/branches/${id}`,
        ...options
    });
    
    return resData;
};
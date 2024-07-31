import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiClassesClassesbybranchidBranchidQueryResponse, GetApiClassesClassesbybranchidBranchidPathParams } from "../models/GetApiClassesClassesbybranchidBranchid";

/**
     * @link /api/Classes/ClassesByBranchId/:branchId
     */
export async function getApiClassesClassesbybranchidBranchid (branchId: GetApiClassesClassesbybranchidBranchidPathParams["branchId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiClassesClassesbybranchidBranchidQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiClassesClassesbybranchidBranchidQueryResponse>({
        method: "get",
        url: `/api/Classes/ClassesByBranchId/${branchId}`,
        ...options
    });
    
    return resData;
};
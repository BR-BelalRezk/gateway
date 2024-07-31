import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiHoldinglistAddtrineetoholdinglistMutationRequest, PostApiHoldinglistAddtrineetoholdinglistMutationResponse } from "../models/PostApiHoldinglistAddtrineetoholdinglist";

/**
     * @link /api/HoldingList/AddTrineeToHoldingList
     */
export async function postApiHoldinglistAddtrineetoholdinglist (data?: PostApiHoldinglistAddtrineetoholdinglistMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiHoldinglistAddtrineetoholdinglistMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiHoldinglistAddtrineetoholdinglistMutationResponse, PostApiHoldinglistAddtrineetoholdinglistMutationRequest>({
        method: "post",
        url: `/api/HoldingList/AddTrineeToHoldingList`,
        data,
        ...options
    });
    
    return resData;
};
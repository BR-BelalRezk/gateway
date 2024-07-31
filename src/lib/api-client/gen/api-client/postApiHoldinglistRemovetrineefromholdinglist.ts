import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiHoldinglistRemovetrineefromholdinglistMutationRequest, PostApiHoldinglistRemovetrineefromholdinglistMutationResponse } from "../models/PostApiHoldinglistRemovetrineefromholdinglist";

/**
     * @link /api/HoldingList/RemoveTrineeFromHoldingList
     */
export async function postApiHoldinglistRemovetrineefromholdinglist (data?: PostApiHoldinglistRemovetrineefromholdinglistMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiHoldinglistRemovetrineefromholdinglistMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiHoldinglistRemovetrineefromholdinglistMutationResponse, PostApiHoldinglistRemovetrineefromholdinglistMutationRequest>({
        method: "post",
        url: `/api/HoldingList/RemoveTrineeFromHoldingList`,
        data,
        ...options
    });
    
    return resData;
};
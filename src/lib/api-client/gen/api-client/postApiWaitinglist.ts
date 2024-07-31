import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiWaitinglistMutationResponse, PostApiWaitinglistQueryParams } from "../models/PostApiWaitinglist";

/**
     * @link /api/waitinglist
     */
export async function postApiWaitinglist (params?: PostApiWaitinglistQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiWaitinglistMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiWaitinglistMutationResponse>({
        method: "post",
        url: `/api/waitinglist`,
        params,
        ...options
    });
    
    return resData;
};
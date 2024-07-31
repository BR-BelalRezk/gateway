import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiEntitiesTablenameMutationResponse, PostApiEntitiesTablenamePathParams } from "../models/PostApiEntitiesTablename";

/**
     * @link /api/Entities/:tableName
     */
export async function postApiEntitiesTablename (tableName: PostApiEntitiesTablenamePathParams["tableName"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiEntitiesTablenameMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiEntitiesTablenameMutationResponse>({
        method: "post",
        url: `/api/Entities/${tableName}`,
        ...options
    });
    
    return resData;
};
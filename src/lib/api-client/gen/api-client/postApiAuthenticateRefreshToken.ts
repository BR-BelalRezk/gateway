import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAuthenticateRefreshTokenMutationRequest, PostApiAuthenticateRefreshTokenMutationResponse } from "../models/PostApiAuthenticateRefreshToken";

/**
     * @link /api/Authenticate/refresh-token
     */
export async function postApiAuthenticateRefreshToken (data?: PostApiAuthenticateRefreshTokenMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAuthenticateRefreshTokenMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAuthenticateRefreshTokenMutationResponse, PostApiAuthenticateRefreshTokenMutationRequest>({
        method: "post",
        url: `/api/Authenticate/refresh-token`,
        data,
        ...options
    });
    
    return resData;
};
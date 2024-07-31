import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAuthenticateApiChangePasswordMutationRequest, PostApiAuthenticateApiChangePasswordMutationResponse } from "../models/PostApiAuthenticateApiChangePassword";

/**
     * @link /api/Authenticate/api/change-password
     */
export async function postApiAuthenticateApiChangePassword (data?: PostApiAuthenticateApiChangePasswordMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAuthenticateApiChangePasswordMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAuthenticateApiChangePasswordMutationResponse, PostApiAuthenticateApiChangePasswordMutationRequest>({
        method: "post",
        url: `/api/Authenticate/api/change-password`,
        data,
        ...options
    });
    
    return resData;
};
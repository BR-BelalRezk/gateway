import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAuthenticateLoginMutationRequest, PostApiAuthenticateLoginMutationResponse } from "../models/PostApiAuthenticateLogin";

/**
     * @link /api/Authenticate/login
     */
export async function postApiAuthenticateLogin (data: PostApiAuthenticateLoginMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAuthenticateLoginMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAuthenticateLoginMutationResponse, PostApiAuthenticateLoginMutationRequest>({
        method: "post",
        url: `/api/Authenticate/login`,
        data,
        ...options
    });
    
    return resData;
};
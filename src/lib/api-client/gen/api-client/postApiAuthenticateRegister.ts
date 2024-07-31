import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAuthenticateRegisterMutationRequest, PostApiAuthenticateRegisterMutationResponse } from "../models/PostApiAuthenticateRegister";

/**
     * @link /api/Authenticate/register
     */
export async function postApiAuthenticateRegister (data: PostApiAuthenticateRegisterMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAuthenticateRegisterMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAuthenticateRegisterMutationResponse, PostApiAuthenticateRegisterMutationRequest>({
        method: "post",
        url: `/api/Authenticate/register`,
        data,
        ...options
    });
    
    return resData;
};
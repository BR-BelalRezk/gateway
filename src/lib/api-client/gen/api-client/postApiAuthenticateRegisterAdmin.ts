import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAuthenticateRegisterAdminMutationRequest, PostApiAuthenticateRegisterAdminMutationResponse } from "../models/PostApiAuthenticateRegisterAdmin";

/**
     * @link /api/Authenticate/register-admin
     */
export async function postApiAuthenticateRegisterAdmin (data: PostApiAuthenticateRegisterAdminMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAuthenticateRegisterAdminMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAuthenticateRegisterAdminMutationResponse, PostApiAuthenticateRegisterAdminMutationRequest>({
        method: "post",
        url: `/api/Authenticate/register-admin`,
        data,
        ...options
    });
    
    return resData;
};
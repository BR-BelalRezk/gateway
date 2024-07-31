import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiAuthenticateIdMutationRequest, PutApiAuthenticateIdMutationResponse, PutApiAuthenticateIdPathParams } from "../models/PutApiAuthenticateId";

/**
     * @link /api/Authenticate/:id
     */
export async function putApiAuthenticateId (id: PutApiAuthenticateIdPathParams["id"], data?: PutApiAuthenticateIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiAuthenticateIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiAuthenticateIdMutationResponse, PutApiAuthenticateIdMutationRequest>({
        method: "put",
        url: `/api/Authenticate/${id}`,
        data,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiAuthenticateIdMutationResponse, DeleteApiAuthenticateIdPathParams } from "../models/DeleteApiAuthenticateId";

/**
     * @link /api/Authenticate/:id
     */
export async function deleteApiAuthenticateId (id: DeleteApiAuthenticateIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiAuthenticateIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiAuthenticateIdMutationResponse>({
        method: "delete",
        url: `/api/Authenticate/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiClassesClassesIdMutationRequest, PutApiClassesClassesIdMutationResponse, PutApiClassesClassesIdPathParams } from "../models/PutApiClassesClassesId";

/**
     * @link /api/Classes/Classes/:id
     */
export async function putApiClassesClassesId (id: PutApiClassesClassesIdPathParams["id"], data?: PutApiClassesClassesIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiClassesClassesIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiClassesClassesIdMutationResponse, PutApiClassesClassesIdMutationRequest>({
        method: "put",
        url: `/api/Classes/Classes/${id}`,
        data,
        ...options
    });
    
    return resData;
};
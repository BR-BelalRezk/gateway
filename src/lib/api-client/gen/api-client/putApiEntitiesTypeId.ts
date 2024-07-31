import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesTypeIdMutationRequest, PutApiEntitiesTypeIdMutationResponse, PutApiEntitiesTypeIdPathParams } from "../models/PutApiEntitiesTypeId";

/**
     * @link /api/Entities/type/:id
     */
export async function putApiEntitiesTypeId (id: PutApiEntitiesTypeIdPathParams["id"], data?: PutApiEntitiesTypeIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesTypeIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesTypeIdMutationResponse, PutApiEntitiesTypeIdMutationRequest>({
        method: "put",
        url: `/api/Entities/type/${id}`,
        data,
        ...options
    });
    
    return resData;
};
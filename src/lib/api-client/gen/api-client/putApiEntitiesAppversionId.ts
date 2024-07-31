import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesAppversionIdMutationRequest, PutApiEntitiesAppversionIdMutationResponse, PutApiEntitiesAppversionIdPathParams } from "../models/PutApiEntitiesAppversionId";

/**
     * @link /api/Entities/appversion/:id
     */
export async function putApiEntitiesAppversionId (id: PutApiEntitiesAppversionIdPathParams["id"], data?: PutApiEntitiesAppversionIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesAppversionIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesAppversionIdMutationResponse, PutApiEntitiesAppversionIdMutationRequest>({
        method: "put",
        url: `/api/Entities/appversion/${id}`,
        data,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiEntitiesLevelsIdMutationRequest, PutApiEntitiesLevelsIdMutationResponse, PutApiEntitiesLevelsIdPathParams } from "../models/PutApiEntitiesLevelsId";

/**
     * @link /api/Entities/levels/:id
     */
export async function putApiEntitiesLevelsId (id: PutApiEntitiesLevelsIdPathParams["id"], data?: PutApiEntitiesLevelsIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiEntitiesLevelsIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiEntitiesLevelsIdMutationResponse, PutApiEntitiesLevelsIdMutationRequest>({
        method: "put",
        url: `/api/Entities/levels/${id}`,
        data,
        ...options
    });
    
    return resData;
};
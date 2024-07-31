import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiTraineeIdMutationRequest, PutApiTraineeIdMutationResponse, PutApiTraineeIdPathParams } from "../models/PutApiTraineeId";

/**
     * @link /api/Trainee/:id
     */
export async function putApiTraineeId (id: PutApiTraineeIdPathParams["id"], data?: PutApiTraineeIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiTraineeIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiTraineeIdMutationResponse, PutApiTraineeIdMutationRequest>({
        method: "put",
        url: `/api/Trainee/${id}`,
        data,
        ...options
    });
    
    return resData;
};
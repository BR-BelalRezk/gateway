import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiTraineeIdMutationResponse, DeleteApiTraineeIdPathParams } from "../models/DeleteApiTraineeId";

/**
     * @link /api/Trainee/:id
     */
export async function deleteApiTraineeId (id: DeleteApiTraineeIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiTraineeIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiTraineeIdMutationResponse>({
        method: "delete",
        url: `/api/Trainee/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiTraineeIdQueryResponse, GetApiTraineeIdPathParams } from "../models/GetApiTraineeId";

/**
     * @link /api/Trainee/:id
     */
export async function getApiTraineeId (id: GetApiTraineeIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiTraineeIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiTraineeIdQueryResponse>({
        method: "get",
        url: `/api/Trainee/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiOtherbatchesandclassesOtherclassesIdQueryResponse, GetApiOtherbatchesandclassesOtherclassesIdPathParams } from "../models/GetApiOtherbatchesandclassesOtherclassesId";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses/:id
     */
export async function getApiOtherbatchesandclassesOtherclassesId (id: GetApiOtherbatchesandclassesOtherclassesIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiOtherbatchesandclassesOtherclassesIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiOtherbatchesandclassesOtherclassesIdQueryResponse>({
        method: "get",
        url: `/api/OtherBatchesAndClasses/OtherClasses/${id}`,
        ...options
    });
    
    return resData;
};
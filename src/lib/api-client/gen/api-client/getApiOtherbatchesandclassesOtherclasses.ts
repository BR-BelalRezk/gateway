import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiOtherbatchesandclassesOtherclassesQueryResponse } from "../models/GetApiOtherbatchesandclassesOtherclasses";

/**
     * @link /api/OtherBatchesAndClasses/OtherClasses
     */
export async function getApiOtherbatchesandclassesOtherclasses (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiOtherbatchesandclassesOtherclassesQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiOtherbatchesandclassesOtherclassesQueryResponse>({
        method: "get",
        url: `/api/OtherBatchesAndClasses/OtherClasses`,
        ...options
    });
    
    return resData;
};
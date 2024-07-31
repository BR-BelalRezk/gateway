import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiOtherbatchesandclassesEndbatchIdMutationResponse, PostApiOtherbatchesandclassesEndbatchIdPathParams } from "../models/PostApiOtherbatchesandclassesEndbatchId";

/**
     * @link /api/OtherBatchesAndClasses/Endbatch/:id
     */
export async function postApiOtherbatchesandclassesEndbatchId (id: PostApiOtherbatchesandclassesEndbatchIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiOtherbatchesandclassesEndbatchIdMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiOtherbatchesandclassesEndbatchIdMutationResponse>({
        method: "post",
        url: `/api/OtherBatchesAndClasses/Endbatch/${id}`,
        ...options
    });
    
    return resData;
};
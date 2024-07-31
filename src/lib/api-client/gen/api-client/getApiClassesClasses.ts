import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiClassesClassesQueryResponse } from "../models/GetApiClassesClasses";

/**
     * @link /api/Classes/Classes
     */
export async function getApiClassesClasses (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiClassesClassesQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiClassesClassesQueryResponse>({
        method: "get",
        url: `/api/Classes/Classes`,
        ...options
    });
    
    return resData;
};
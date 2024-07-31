import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAttendanceMutationRequest, PostApiAttendanceMutationResponse } from "../models/PostApiAttendance";

/**
     * @link /api/Attendance
     */
export async function postApiAttendance (data?: PostApiAttendanceMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAttendanceMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAttendanceMutationResponse, PostApiAttendanceMutationRequest>({
        method: "post",
        url: `/api/Attendance`,
        data,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { PostApiAttendanceAddtraineetoclassattendanceMutationRequest, PostApiAttendanceAddtraineetoclassattendanceMutationResponse } from "../models/PostApiAttendanceAddtraineetoclassattendance";

/**
     * @link /api/Attendance/AddTraineeToClassAttendance
     */
export async function postApiAttendanceAddtraineetoclassattendance (data?: PostApiAttendanceAddtraineetoclassattendanceMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PostApiAttendanceAddtraineetoclassattendanceMutationResponse>["data"]> {
    const { data: resData } = await client<PostApiAttendanceAddtraineetoclassattendanceMutationResponse, PostApiAttendanceAddtraineetoclassattendanceMutationRequest>({
        method: "post",
        url: `/api/Attendance/AddTraineeToClassAttendance`,
        data,
        ...options
    });
    
    return resData;
};
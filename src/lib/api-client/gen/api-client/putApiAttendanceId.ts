import client from "../client";
import type { ResponseConfig } from "../client";
import type { PutApiAttendanceIdMutationRequest, PutApiAttendanceIdMutationResponse, PutApiAttendanceIdPathParams } from "../models/PutApiAttendanceId";

/**
     * @link /api/Attendance/:id
     */
export async function putApiAttendanceId (id: PutApiAttendanceIdPathParams["id"], data?: PutApiAttendanceIdMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PutApiAttendanceIdMutationResponse>["data"]> {
    const { data: resData } = await client<PutApiAttendanceIdMutationResponse, PutApiAttendanceIdMutationRequest>({
        method: "put",
        url: `/api/Attendance/${id}`,
        data,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAttendanceIdQueryResponse, GetApiAttendanceIdPathParams } from "../models/GetApiAttendanceId";

/**
     * @link /api/Attendance/:id
     */
export async function getApiAttendanceId (id: GetApiAttendanceIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAttendanceIdQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAttendanceIdQueryResponse>({
        method: "get",
        url: `/api/Attendance/${id}`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAttendanceQueryResponse } from "../models/GetApiAttendance";

/**
     * @link /api/Attendance
     */
export async function getApiAttendance (options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAttendanceQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAttendanceQueryResponse>({
        method: "get",
        url: `/api/Attendance`,
        ...options
    });
    
    return resData;
};
import client from "../client";
import type { ResponseConfig } from "../client";
import type { GetApiAttendanceGetattendancebyclassidQueryResponse, GetApiAttendanceGetattendancebyclassidQueryParams } from "../models/GetApiAttendanceGetattendancebyclassid";

/**
     * @link /api/Attendance/getAttendanceByClassId
     */
export async function getApiAttendanceGetattendancebyclassid (params?: GetApiAttendanceGetattendancebyclassidQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetApiAttendanceGetattendancebyclassidQueryResponse>["data"]> {
    const { data: resData } = await client<GetApiAttendanceGetattendancebyclassidQueryResponse>({
        method: "get",
        url: `/api/Attendance/getAttendanceByClassId`,
        params,
        ...options
    });
    
    return resData;
};
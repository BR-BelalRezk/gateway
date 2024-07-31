import client from "../client";
import type { ResponseConfig } from "../client";
import type { DeleteApiAttendanceIdMutationResponse, DeleteApiAttendanceIdPathParams } from "../models/DeleteApiAttendanceId";

/**
     * @link /api/Attendance/:id
     */
export async function deleteApiAttendanceId (id: DeleteApiAttendanceIdPathParams["id"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteApiAttendanceIdMutationResponse>["data"]> {
    const { data: resData } = await client<DeleteApiAttendanceIdMutationResponse>({
        method: "delete",
        url: `/api/Attendance/${id}`,
        ...options
    });
    
    return resData;
};

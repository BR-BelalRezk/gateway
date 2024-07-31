import type { Attendance } from "./Attendance";

export type GetApiAttendanceIdPathParams = {
    /**
     * @type integer int32
    */
    id: number;
};

/**
 * @description Success
*/
export type GetApiAttendanceIdQueryResponse = Attendance;

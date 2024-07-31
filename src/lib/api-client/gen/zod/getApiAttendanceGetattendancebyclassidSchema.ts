import { z } from "zod";


export const getApiAttendanceGetattendancebyclassidQueryParamsSchema = z.object({"classId": z.number().optional()});
export const getApiAttendanceGetattendancebyclassidQueryResponseSchema = z.any();
import { z } from "zod";


export const deleteApiAttendanceIdMutationResponseSchema = z.any();
export const deleteApiAttendanceIdPathParamsSchema = z.object({"id": z.number()});
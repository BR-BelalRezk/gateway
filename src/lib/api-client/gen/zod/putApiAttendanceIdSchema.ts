import { z } from "zod";

import { attendanceViewModelSchema } from "./attendanceViewModelSchema";

export const putApiAttendanceIdMutationResponseSchema = z.any();
export const putApiAttendanceIdPathParamsSchema = z.object({"id": z.number()});
export const putApiAttendanceIdMutationRequestSchema = z.lazy(() => attendanceViewModelSchema).schema;
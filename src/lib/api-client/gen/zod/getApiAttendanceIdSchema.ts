import { z } from "zod";

import { attendanceSchema } from "./attendanceSchema";

export const getApiAttendanceIdPathParamsSchema = z.object({"id": z.number()});

      /**
       * @description Success
       */
export const getApiAttendanceIdQueryResponseSchema = z.lazy(() => attendanceSchema).schema;
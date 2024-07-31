import { z } from "zod";

import { attendanceSchema } from "./attendanceSchema";


      /**
       * @description Success
       */
export const getApiAttendanceQueryResponseSchema = z.array(z.lazy(() => attendanceSchema).schema);
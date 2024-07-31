import { z } from "zod";

import { attendanceViewModelSchema } from "./attendanceViewModelSchema";

export const postApiAttendanceMutationRequestSchema = z.lazy(() => attendanceViewModelSchema).schema;

      /**
       * @description Success
       */
export const postApiAttendanceMutationResponseSchema = z.lazy(() => attendanceViewModelSchema).schema;
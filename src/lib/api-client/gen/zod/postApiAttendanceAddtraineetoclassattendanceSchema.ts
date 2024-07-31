import { z } from "zod";

import { classAttanceViewModelSchema } from "./classAttanceViewModelSchema";

export const postApiAttendanceAddtraineetoclassattendanceMutationResponseSchema = z.any();
export const postApiAttendanceAddtraineetoclassattendanceMutationRequestSchema = z.lazy(() => classAttanceViewModelSchema).schema;
import { z } from "zod";

import { timeSpanSchema } from "./timeSpanSchema";

export const timeSlotSchema = z.object({"id": z.number().optional(),"startTime": z.lazy(() => timeSpanSchema).schema.optional(),"endTime": z.lazy(() => timeSpanSchema).schema.optional(),"day1": z.string().nullish(),"day2": z.string().nullish()});
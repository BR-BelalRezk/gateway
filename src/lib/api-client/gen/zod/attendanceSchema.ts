import { z } from "zod";

import { traineeSchema } from "./traineeSchema";
import { classSchema } from "./classSchema";

export const attendanceSchema = z.object({"id": z.number().optional(),"traineeId": z.number().optional(),"trainee": z.lazy(() => traineeSchema).schema.optional(),"dayNumber": z.number().optional(),"classId": z.number().optional(),"class": z.lazy(() => classSchema).schema.optional(),"noteFromSession": z.string().nullish(),"noteFromTrainer": z.string().nullish()});
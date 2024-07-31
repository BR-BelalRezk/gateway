import { z } from "zod";

import { traineeSchema } from "./traineeSchema";

export const classTraineeSchema = z.object({"id": z.number().optional(),"classId": z.number().optional(),"traineeId": z.number().optional(),"trainee": z.lazy(() => traineeSchema).schema.optional(),"adminNotes": z.string().nullish(),"trainerNotes": z.string().nullish(),"isDeleted": z.boolean().optional()});
import { z } from "zod";

import { classTypeSchema } from "./classTypeSchema";
import { otherBatchesSchema } from "./otherBatchesSchema";
import { timeSlotSchema } from "./timeSlotSchema";
import { roomSchema } from "./roomSchema";
import { trainerSchema } from "./trainerSchema";
import { classTraineeSchema } from "./classTraineeSchema";
import { attendanceSchema } from "./attendanceSchema";

export const otherClassSchema = z.object({"id": z.number().optional(),"name": z.string().nullish(),"typeId": z.number().optional(),"type": z.lazy(() => classTypeSchema).schema.optional(),"dayNumber": z.number().nullish(),"batchId": z.number().optional(),"batch": z.lazy(() => otherBatchesSchema).schema.optional(),"timeSlotId": z.number().optional(),"timeSlot": z.lazy(() => timeSlotSchema).schema.optional(),"roomId": z.number().nullish(),"room": z.lazy(() => roomSchema).schema.optional(),"trainerId": z.number().nullish(),"trainer": z.lazy(() => trainerSchema).schema.optional(),"classTrainees": z.array(z.lazy(() => classTraineeSchema).schema).nullish(),"attendance": z.array(z.lazy(() => attendanceSchema).schema).nullish()});
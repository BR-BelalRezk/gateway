import { z } from "zod";

import { classTypeSchema } from "./classTypeSchema";
import { batchSchema } from "./batchSchema";
import { timeSlotSchema } from "./timeSlotSchema";
import { roomSchema } from "./roomSchema";
import { trainerSchema } from "./trainerSchema";
import { classTraineeSchema } from "./classTraineeSchema";
import { levelSchema } from "./levelSchema";

export const classSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullish(),
  typeId: z.number().optional(),
  type: z.lazy(() => classTypeSchema).schema.optional(),
  dayNumber: z.number().nullish(),
  batchId: z.number().optional(),
  batch: z.lazy(() => batchSchema).schema.optional(),
  timeSlotId: z.number().optional(),
  timeSlot: z.lazy(() => timeSlotSchema).schema.optional(),
  roomId: z.number().nullish(),
  room: z.lazy(() => roomSchema).schema.optional(),
  trainerId: z.number().nullish(),
  trainer: z.lazy(() => trainerSchema).schema.optional(),
  classTrainees: z.array(z.lazy(() => classTraineeSchema).schema).nullish(),
  levelId: z.number().nullish(),
  level: z.lazy(() => levelSchema).schema.optional(),
});

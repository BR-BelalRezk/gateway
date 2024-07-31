import { traineeSchema } from "@/app/(home)/pending-test/schema";
import { z } from "zod";

export const holdListTraineeSchema = z.object({
  id: z.number(),
  notes: z.string().nullable(),
  trainee: traineeSchema,
  traineeId: z.number(),
});

export type HoldListTraineeRow = z.infer<typeof holdListTraineeSchema>;

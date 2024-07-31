import { traineeSchema } from "@/app/(home)/pending-test/schema";
import { z } from "zod";



export const waitListTraineeSchema = z.object({
  id: z.number(),
  status: z.string(),
  notes: z.string().nullable(),
  testNotes: z.string(),
  paymentDate: z.string(),
  paidValue: z.number().nullable(),
  remainingValue: z.number().nullable(),
  paidStatus: z.string(),
  paidType: z.string().nullable(),
  trainee: traineeSchema,
  traineeId: z.number(),
});


export type WaitListTraineeRow = z.infer<typeof waitListTraineeSchema>;

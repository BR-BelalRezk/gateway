import { z } from "zod";


export const paymentHistorySchema = z.object({
  id: z.number().optional(),
  paymentDate: z.string().optional(),
  paidValue: z.number().nullish(),
  remainingValue: z.number().nullish(),
  paidStatus: z.string().nullish(),
  paidType: z.string().nullish(),
  notes: z.string().nullish(),
  traineeId: z.number().optional(),
});
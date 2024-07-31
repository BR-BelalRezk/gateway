import { z } from "zod";

export const paymentHistorySchema = z.object({
  id: z.number(),
  paymentDate: z.string().nullish(),
  paidValue: z.number(),
  remainingValue: z.number().nullable(),
  paidStatus: z.string().nullable(),
  paidType: z.string().nullable(),
  notes: z.string(),
  traineeId: z.number(),
});
// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const traineeSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  mobile: z.string(),
  birthdate: z.string().nullable(),
  email: z.string().nullable(),
  startTimeForTest: z.string().nullable(),
  preferredDayForTest: z.string().nullable(),
  preferredSlot: z.object({
    id: z.number(),
    startTime: z.string(),
    endTime: z.string(),
    day1: z.string(),
    day2: z.string(),
  }).nullable(),
  secondPreferredSlot: z.object({
    id: z.number(),
    startTime: z.string(),
    endTime: z.string(),
    day1: z.string(),
    day2: z.string(),
  }).nullable(),
  branch: z.object({ id: z.number(), name: z.string() }),
  attendType: z.string().nullable(),
  notes: z.string().nullable(),
  education: z.string().nullable(),
  job: z.string().nullable(),
  testDate: z.string().nullable(),
  country: z.object({
    id: z.number(),
    name: z.string(),
    iso3: z.string(),
    iso2: z.string(),
    phone_code: z.string(),
    currency: z.string(),
  }).nullable(),
  city: z.object({ id: z.number(), name: z.string() }).nullable(),

  assignedTrainer: z
    .object({
      id: z.number(),
      aspNetUser: z.object({
        userName: z.string(),
      }),
    })
    .nullable(),

  followUpUser: z.array(z.object({
    id: z.string(),
    userName: z.string(),
  })
    ),

  level: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),

  //  status: null,
   paymentHistory: z.array(paymentHistorySchema).nullable(),
});


export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TraineeRow = z.infer<typeof traineeSchema>;

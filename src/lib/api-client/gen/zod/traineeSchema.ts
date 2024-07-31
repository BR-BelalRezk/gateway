import { z } from "zod";

import { timeSpanSchema } from "./timeSpanSchema";
import { timeSlotSchema } from "./timeSlotSchema";
import { branchSchema } from "./branchSchema";
import { countriesSchema } from "./countriesSchema";
import { citiesSchema } from "./citiesSchema";
import { levelSchema } from "./levelSchema";
import { trainerSchema } from "./trainerSchema";
import { applicationUserSchema } from "./applicationUserSchema";
import { paymentHistorySchema } from "./paymentHistorySchema";

export const traineeSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().nullish(),
  mobile: z.string().nullish(),
  birthdate: z.string().nullish(),
  address: z.string().nullish(),
  email: z.string().nullish(),
  startTimeForTest: z.lazy(() => timeSpanSchema).schema.optional(),
  isDeleted: z.boolean().optional(),
  preferredDayForTest: z.string().nullish(),
  preferredSlotId: z.number().nullish(),
  preferredSlot: z.lazy(() => timeSlotSchema).schema.optional(),
  secondPreferredSlotId: z.number().nullish(),
  secondPreferredSlot: z.lazy(() => timeSlotSchema).schema.optional(),
  branchId: z.number().nullish(),
  branch: z.lazy(() => branchSchema).schema.optional(),
  attendType: z.string().nullish(),
  levelId: z.number().nullish(),
  status: z.string().nullish(),
  currentStatus: z.string().nullish(),
  notes: z.string().nullish(),
  education: z.string().nullish(),
  job: z.string().nullish(),
  testDate: z.string().datetime().nullish(),
  country: z.lazy(() => countriesSchema).schema.optional(),
  countryId: z.number().optional(),
  city: z.lazy(() => citiesSchema).schema.optional(),
  cityId: z.number().nullish(),
  typeOfGender: z.string().nullish(),
  level: z.lazy(() => levelSchema).schema.optional(),
  assignedTrainerId: z.number().nullish(),
  assignedTrainer: z.lazy(() => trainerSchema).schema.optional(),
  followUpUserId: z.string().nullish(),
  followUpUser: z.lazy(() => applicationUserSchema).schema.optional(),
  paymentHistory: z.array(z.lazy(() => paymentHistorySchema).schema).nullish(),
});

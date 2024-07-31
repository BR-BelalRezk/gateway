import { z } from "zod";

import { timeSlotSchema } from "./timeSlotSchema";

export const postApiEntitiesTimeslotsMutationResponseSchema = z.any();
export const postApiEntitiesTimeslotsMutationRequestSchema = z.lazy(() => timeSlotSchema).schema;
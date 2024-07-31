import { z } from "zod";

import { timeSlotSchema } from "./timeSlotSchema";

export const putApiEntitiesTimeslotsIdMutationResponseSchema = z.any();
export const putApiEntitiesTimeslotsIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesTimeslotsIdMutationRequestSchema = z.lazy(() => timeSlotSchema).schema;
import { z } from "zod";


export const deleteApiTraineeIdMutationResponseSchema = z.any();
export const deleteApiTraineeIdPathParamsSchema = z.object({"id": z.number()});
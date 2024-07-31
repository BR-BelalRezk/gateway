import { z } from "zod";


export const deleteApiBatchesIdMutationResponseSchema = z.any();
export const deleteApiBatchesIdPathParamsSchema = z.object({"id": z.number()});
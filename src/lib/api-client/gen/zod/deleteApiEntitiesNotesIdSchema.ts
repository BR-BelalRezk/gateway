import { z } from "zod";


export const deleteApiEntitiesNotesIdMutationResponseSchema = z.any();
export const deleteApiEntitiesNotesIdPathParamsSchema = z.object({"id": z.number()});
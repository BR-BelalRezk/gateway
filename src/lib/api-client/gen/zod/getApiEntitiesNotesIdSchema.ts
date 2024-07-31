import { z } from "zod";


export const getApiEntitiesNotesIdPathParamsSchema = z.object({"id": z.number()});
export const getApiEntitiesNotesIdQueryResponseSchema = z.any();
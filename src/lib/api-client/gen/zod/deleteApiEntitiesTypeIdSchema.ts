import { z } from "zod";


export const deleteApiEntitiesTypeIdMutationResponseSchema = z.any();
export const deleteApiEntitiesTypeIdPathParamsSchema = z.object({"id": z.number()});
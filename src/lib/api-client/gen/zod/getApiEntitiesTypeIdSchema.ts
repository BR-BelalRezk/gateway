import { z } from "zod";


export const getApiEntitiesTypeIdPathParamsSchema = z.object({"id": z.number()});
export const getApiEntitiesTypeIdQueryResponseSchema = z.any();
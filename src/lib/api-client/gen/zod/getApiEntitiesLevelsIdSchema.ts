import { z } from "zod";


export const getApiEntitiesLevelsIdPathParamsSchema = z.object({"id": z.number()});
export const getApiEntitiesLevelsIdQueryResponseSchema = z.any();
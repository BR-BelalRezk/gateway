import { z } from "zod";


export const getApiEntitiesTimeslotsIdPathParamsSchema = z.object({"id": z.number()});
export const getApiEntitiesTimeslotsIdQueryResponseSchema = z.any();
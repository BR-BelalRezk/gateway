import { z } from "zod";


export const getApiEntitiesCountryIdPathParamsSchema = z.object({"id": z.number()});
export const getApiEntitiesCountryIdQueryResponseSchema = z.any();
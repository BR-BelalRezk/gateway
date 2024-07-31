import { z } from "zod";


export const getApiEntitiesCityQueryParamsSchema = z.object({"CountryId": z.number().optional()});
export const getApiEntitiesCityQueryResponseSchema = z.any();
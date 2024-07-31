import { z } from "zod";

import { countriesSchema } from "./countriesSchema";

export const citiesSchema = z.object({"id": z.number().optional(),"name": z.string().nullish(),"countryId": z.number().optional(),"country": z.lazy(() => countriesSchema).schema.optional()});
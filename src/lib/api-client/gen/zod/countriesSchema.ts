import { z } from "zod";


export const countriesSchema = z.object({"id": z.number().optional(),"name": z.string().nullish(),"iso3": z.string().nullish(),"iso2": z.string().nullish(),"phone_code": z.string().nullish(),"currency": z.string().nullish()});
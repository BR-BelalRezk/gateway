import { z } from "zod";


export const virtualBatchSchema = z.object({"id": z.number().optional(),"name": z.string().nullish(),"startDate": z.string().datetime().nullish(),"endDate": z.string().datetime().nullish()});
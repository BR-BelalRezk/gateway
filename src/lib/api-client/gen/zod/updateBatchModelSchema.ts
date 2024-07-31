import { z } from "zod";


export const updateBatchModelSchema = z.object({"name": z.string().nullish(),"startDate": z.string().datetime().nullish(),"endDate": z.string().datetime().nullish(),"branchId": z.number().nullish()});
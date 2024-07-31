import { z } from "zod";

import { branchSchema } from "./branchSchema";

export const batchSchema = z.object({"id": z.number().optional(),"name": z.string().nullish(),"startDate": z.string().datetime().nullish(),"endDate": z.string().datetime().nullish(),"isActive": z.boolean().optional(),"branchId": z.number().nullish(),"branch": z.lazy(() => branchSchema).schema.optional()});
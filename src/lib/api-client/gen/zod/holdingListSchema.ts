import { z } from "zod";

import { traineeSchema } from "./traineeSchema";

export const holdingListSchema = z.object({"id": z.number().optional(),"trainee": z.lazy(() => traineeSchema).schema.optional(),"traineeId": z.number().optional(),"notes": z.string().nullish()});
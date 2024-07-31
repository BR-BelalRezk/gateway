import { z } from "zod";

import { traineeSchema } from "./traineeSchema";

export const waitingListSchema = z.object({"id": z.number().optional(),"status": z.string().nullish(),"notes": z.string().nullish(),"testNotes": z.string().nullish(),"paymentDate": z.string().datetime().optional(),"paidValue": z.number().nullish(),"remainingValue": z.number().nullish(),"paidStatus": z.string().nullish(),"paidType": z.string().nullish(),"trainee": z.lazy(() => traineeSchema).schema.optional(),"traineeId": z.number().optional(),"isDeleted": z.boolean().optional()});
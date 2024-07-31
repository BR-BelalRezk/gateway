import { z } from "zod";

import { branchSchema } from "./branchSchema";
import { applicationUserSchema } from "./applicationUserSchema";

export const trainerSchema = z.object({"id": z.number().optional(),"branchId": z.number().nullish(),"branch": z.lazy(() => branchSchema).schema.optional(),"aspNetUserId": z.string().nullish(),"aspNetUser": z.lazy(() => applicationUserSchema).schema.optional()});
import { z } from "zod";

import { otherBatchesSchema } from "./otherBatchesSchema";

export const otherBatchWithClassCountSchema = z.object({"batch": z.lazy(() => otherBatchesSchema).schema.optional(),"classCount": z.number().optional()});
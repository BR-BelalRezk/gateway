import { z } from "zod";

import { batchSchema } from "./batchSchema";

export const batchWithClassCountSchema = z.object({"batch": z.lazy(() => batchSchema).schema.optional(),"classCount": z.number().optional()});
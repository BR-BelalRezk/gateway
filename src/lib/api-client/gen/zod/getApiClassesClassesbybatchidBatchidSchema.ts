import { z } from "zod";

import { classSchema } from "./classSchema";

export const getApiClassesClassesbybatchidBatchidPathParamsSchema = z.object({"BatchId": z.number()});
export const getApiClassesClassesbybatchidBatchidQueryParamsSchema = z.object({"keyword": z.string().default('').optional(),"levels": z.string().default('').optional(),"types": z.string().default('').optional(),"traineeId": z.number().optional()});

      /**
       * @description Success
       */
export const getApiClassesClassesbybatchidBatchidQueryResponseSchema = z.array(z.lazy(() => classSchema).schema);
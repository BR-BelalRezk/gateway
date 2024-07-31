import { z } from "zod";

import { batchWithClassCountSchema } from "./batchWithClassCountSchema";

export const getApiBatchesBatchQueryParamsSchema = z.object({"branchId": z.string().optional()});

      /**
       * @description Success
       */
export const getApiBatchesBatchQueryResponseSchema = z.array(z.lazy(() => batchWithClassCountSchema).schema);
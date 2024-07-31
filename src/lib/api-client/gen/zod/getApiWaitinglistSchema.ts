import { z } from "zod";

import { waitingListSchema } from "./waitingListSchema";

export const getApiWaitinglistQueryParamsSchema = z.object({"keyword": z.string().default('').optional(),"branches": z.string().default('').optional(),"attendTypes": z.string().default('').optional(),"levels": z.string().default('').optional(),"traineeId": z.number().optional(),"page": z.number().optional(),"pageSize": z.number().optional()});

      /**
       * @description Success
       */
export const getApiWaitinglistQueryResponseSchema = z.array(z.lazy(() => waitingListSchema).schema);
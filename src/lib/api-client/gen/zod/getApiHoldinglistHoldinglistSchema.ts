import { z } from "zod";

import { holdingListSchema } from "./holdingListSchema";

export const getApiHoldinglistHoldinglistQueryParamsSchema = z.object({"keyword": z.string().default('').optional(),"traineeId": z.number().optional()});

      /**
       * @description Success
       */
export const getApiHoldinglistHoldinglistQueryResponseSchema = z.array(z.lazy(() => holdingListSchema).schema);
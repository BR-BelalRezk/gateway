import { z } from "zod";

import { otherBatchWithClassCountSchema } from "./otherBatchWithClassCountSchema";

export const getApiOtherbatchesandclassesOtherbatchQueryParamsSchema = z.object({"branchId": z.number().optional()});

      /**
       * @description Success
       */
export const getApiOtherbatchesandclassesOtherbatchQueryResponseSchema = z.array(z.lazy(() => otherBatchWithClassCountSchema).schema);
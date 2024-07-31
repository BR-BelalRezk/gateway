import { z } from "zod";

import { otherClassSchema } from "./otherClassSchema";

export const getApiOtherbatchesandclassesOtherclassesbybatchidBatchidPathParamsSchema = z.object({"BatchId": z.number()});

      /**
       * @description Success
       */
export const getApiOtherbatchesandclassesOtherclassesbybatchidBatchidQueryResponseSchema = z.array(z.lazy(() => otherClassSchema).schema);
import { z } from "zod";

import { otherClassSchema } from "./otherClassSchema";

export const getApiOtherbatchesandclassesOtherclassesIdPathParamsSchema = z.object({"id": z.number()});

      /**
       * @description Success
       */
export const getApiOtherbatchesandclassesOtherclassesIdQueryResponseSchema = z.lazy(() => otherClassSchema).schema;
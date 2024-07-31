import { z } from "zod";

import { batchWithClassCountSchema } from "./batchWithClassCountSchema";

export const getApiBatchesIdPathParamsSchema = z.object({"id": z.string()});

      /**
       * @description Success
       */
export const getApiBatchesIdQueryResponseSchema = z.array(z.lazy(() => batchWithClassCountSchema).schema);
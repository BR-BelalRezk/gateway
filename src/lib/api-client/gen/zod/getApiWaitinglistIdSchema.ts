import { z } from "zod";

import { waitingListSchema } from "./waitingListSchema";

export const getApiWaitinglistIdPathParamsSchema = z.object({"id": z.number()});

      /**
       * @description Success
       */
export const getApiWaitinglistIdQueryResponseSchema = z.lazy(() => waitingListSchema).schema;
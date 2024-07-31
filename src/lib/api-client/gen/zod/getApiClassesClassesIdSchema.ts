import { z } from "zod";

import { classSchema } from "./classSchema";

export const getApiClassesClassesIdPathParamsSchema = z.object({"id": z.number()});

      /**
       * @description Success
       */
export const getApiClassesClassesIdQueryResponseSchema = z.lazy(() => classSchema).schema;
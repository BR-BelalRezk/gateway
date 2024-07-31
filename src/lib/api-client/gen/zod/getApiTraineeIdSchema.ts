import { z } from "zod";

import { traineeSchema } from "./traineeSchema";

export const getApiTraineeIdPathParamsSchema = z.object({"id": z.number()});

      /**
       * @description Success
       */
export const getApiTraineeIdQueryResponseSchema = z.lazy(() => traineeSchema).schema;
import { z } from "zod";

import { traineeSchema } from "./traineeSchema";

export const getApiTraineeTrainerspendingtestQueryParamsSchema = z.object({"id": z.number().optional()});

      /**
       * @description Success
       */
export const getApiTraineeTrainerspendingtestQueryResponseSchema = z.array(z.lazy(() => traineeSchema).schema);
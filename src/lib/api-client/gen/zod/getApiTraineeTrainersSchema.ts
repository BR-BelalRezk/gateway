import { z } from "zod";

import { trainerSchema } from "./trainerSchema";


      /**
       * @description Success
       */
export const getApiTraineeTrainersQueryResponseSchema = z.array(z.lazy(() => trainerSchema).schema);
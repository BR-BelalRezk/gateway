import { z } from "zod";

import { traineeSchema } from "./traineeSchema";


      /**
       * @description Success
       */
export const getApiTraineeQueryResponseSchema = z.array(z.lazy(() => traineeSchema).schema);
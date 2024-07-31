import { z } from "zod";

import { createTraineeCountResponseSchema } from "./createTraineeCountResponseSchema";


      /**
       * @description Success
       */
export const getApiAuthenticateCreatetraineecountQueryResponseSchema = z.lazy(() => createTraineeCountResponseSchema).schema;
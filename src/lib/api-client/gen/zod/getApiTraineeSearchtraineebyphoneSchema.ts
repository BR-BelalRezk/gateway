import { z } from "zod";

import { traineeStatusDtoSchema } from "./traineeStatusDtoSchema";

export const getApiTraineeSearchtraineebyphoneQueryParamsSchema = z.object({"phoneNumber": z.string().optional()});

      /**
       * @description Success
       */
export const getApiTraineeSearchtraineebyphoneQueryResponseSchema = z.lazy(() => traineeStatusDtoSchema).schema;
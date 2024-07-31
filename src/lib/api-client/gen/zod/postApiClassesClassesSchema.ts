import { z } from "zod";

import { classViewModelSchema } from "./classViewModelSchema";
import { classSchema } from "./classSchema";

export const postApiClassesClassesMutationRequestSchema = z.lazy(() => classViewModelSchema).schema;

      /**
       * @description Success
       */
export const postApiClassesClassesMutationResponseSchema = z.lazy(() => classSchema).schema;
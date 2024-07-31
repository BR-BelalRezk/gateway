import { z } from "zod";

import { classViewModelSchema } from "./classViewModelSchema";
import { classSchema } from "./classSchema";

export const postApiOtherbatchesandclassesOtherclassesMutationRequestSchema = z.lazy(() => classViewModelSchema).schema;

      /**
       * @description Success
       */
export const postApiOtherbatchesandclassesOtherclassesMutationResponseSchema = z.lazy(() => classSchema).schema;
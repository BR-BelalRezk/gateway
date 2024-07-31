import { z } from "zod";

import { virtualBatchViewModelSchema } from "./virtualBatchViewModelSchema";
import { virtualBatchSchema } from "./virtualBatchSchema";

export const postApiOtherbatchesandclassesOtherbatchMutationRequestSchema = z.lazy(() => virtualBatchViewModelSchema).schema;

      /**
       * @description Success
       */
export const postApiOtherbatchesandclassesOtherbatchMutationResponseSchema = z.lazy(() => virtualBatchSchema).schema;
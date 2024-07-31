import { z } from "zod";

import { virtualBatchViewModelSchema } from "./virtualBatchViewModelSchema";
import { virtualBatchSchema } from "./virtualBatchSchema";

export const postApiBatchesBatchMutationRequestSchema = z.lazy(() => virtualBatchViewModelSchema).schema;

      /**
       * @description Success
       */
export const postApiBatchesBatchMutationResponseSchema = z.lazy(() => virtualBatchSchema).schema;
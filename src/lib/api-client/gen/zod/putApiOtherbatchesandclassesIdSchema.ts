import { z } from "zod";

import { virtualBatchViewModelSchema } from "./virtualBatchViewModelSchema";

export const putApiOtherbatchesandclassesIdMutationResponseSchema = z.any();
export const putApiOtherbatchesandclassesIdPathParamsSchema = z.object({"id": z.number()});
export const putApiOtherbatchesandclassesIdMutationRequestSchema = z.lazy(() => virtualBatchViewModelSchema).schema;
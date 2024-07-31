import { z } from "zod";

import { updateBatchModelSchema } from "./updateBatchModelSchema";

export const putApiBatchesIdMutationResponseSchema = z.any();
export const putApiBatchesIdPathParamsSchema = z.object({"id": z.number()});
export const putApiBatchesIdMutationRequestSchema = z.lazy(() => updateBatchModelSchema).schema;
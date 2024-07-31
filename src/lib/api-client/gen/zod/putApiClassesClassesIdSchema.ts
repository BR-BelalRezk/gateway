import { z } from "zod";

import { classViewModelSchema } from "./classViewModelSchema";

export const putApiClassesClassesIdMutationResponseSchema = z.any();
export const putApiClassesClassesIdPathParamsSchema = z.object({"id": z.number()});
export const putApiClassesClassesIdMutationRequestSchema = z.lazy(() => classViewModelSchema).schema;
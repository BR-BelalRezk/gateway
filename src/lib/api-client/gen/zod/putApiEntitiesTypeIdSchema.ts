import { z } from "zod";

import { classTypeSchema } from "./classTypeSchema";

export const putApiEntitiesTypeIdMutationResponseSchema = z.any();
export const putApiEntitiesTypeIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesTypeIdMutationRequestSchema = z.lazy(() => classTypeSchema).schema;
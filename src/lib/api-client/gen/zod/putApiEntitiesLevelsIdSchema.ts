import { z } from "zod";

import { levelSchema } from "./levelSchema";

export const putApiEntitiesLevelsIdMutationResponseSchema = z.any();
export const putApiEntitiesLevelsIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesLevelsIdMutationRequestSchema = z.lazy(() => levelSchema).schema;
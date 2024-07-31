import { z } from "zod";

import { levelSchema } from "./levelSchema";

export const postApiEntitiesLevelsMutationResponseSchema = z.any();
export const postApiEntitiesLevelsMutationRequestSchema = z.lazy(() => levelSchema).schema;
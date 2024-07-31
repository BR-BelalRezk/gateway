import { z } from "zod";

import { classTypeSchema } from "./classTypeSchema";

export const postApiEntitiesTypeMutationResponseSchema = z.any();
export const postApiEntitiesTypeMutationRequestSchema = z.lazy(() => classTypeSchema).schema;
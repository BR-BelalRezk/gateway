import { z } from "zod";

import { branchSchema } from "./branchSchema";

export const postApiEntitiesBranchesMutationResponseSchema = z.any();
export const postApiEntitiesBranchesMutationRequestSchema = z.lazy(() => branchSchema).schema;
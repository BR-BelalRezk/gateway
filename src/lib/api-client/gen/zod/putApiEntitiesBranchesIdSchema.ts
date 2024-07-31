import { z } from "zod";

import { branchSchema } from "./branchSchema";

export const putApiEntitiesBranchesIdMutationResponseSchema = z.any();
export const putApiEntitiesBranchesIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesBranchesIdMutationRequestSchema = z.lazy(() => branchSchema).schema;
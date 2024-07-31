import { z } from "zod";

import { addTraineHoldinListRequestSchema } from "./addTraineHoldinListRequestSchema";

export const postApiHoldinglistAddtrineetoholdinglistMutationResponseSchema = z.any();
export const postApiHoldinglistAddtrineetoholdinglistMutationRequestSchema = z.lazy(() => addTraineHoldinListRequestSchema).schema;
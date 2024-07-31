import { z } from "zod";

import { addTraineHoldinListRequestSchema } from "./addTraineHoldinListRequestSchema";

export const postApiHoldinglistRemovetrineefromholdinglistMutationResponseSchema = z.any();
export const postApiHoldinglistRemovetrineefromholdinglistMutationRequestSchema = z.lazy(() => addTraineHoldinListRequestSchema).schema;
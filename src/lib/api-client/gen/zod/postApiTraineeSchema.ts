import { z } from "zod";

import { registerTraineeSchema } from "./registerTraineeSchema";

export const postApiTraineeMutationResponseSchema = z.any();
export const postApiTraineeMutationRequestSchema = z.lazy(() => registerTraineeSchema).schema;
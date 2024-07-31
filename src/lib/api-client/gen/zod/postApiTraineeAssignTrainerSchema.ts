import { z } from "zod";

import { assignTrainerRequestSchema } from "./assignTrainerRequestSchema";

export const postApiTraineeAssignTrainerMutationResponseSchema = z.any();
export const postApiTraineeAssignTrainerMutationRequestSchema = z.lazy(() => assignTrainerRequestSchema).schema;
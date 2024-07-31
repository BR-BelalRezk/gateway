import { z } from "zod";

import { addTraineeLevelRequestSchema } from "./addTraineeLevelRequestSchema";

export const postApiTraineeAddtrineelevelMutationResponseSchema = z.any();
export const postApiTraineeAddtrineelevelMutationRequestSchema = z.lazy(() => addTraineeLevelRequestSchema).schema;
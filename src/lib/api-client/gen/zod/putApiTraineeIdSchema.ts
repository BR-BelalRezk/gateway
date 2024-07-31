import { z } from "zod";

import { traineeViewModelSchema } from "./traineeViewModelSchema";

export const putApiTraineeIdMutationResponseSchema = z.any();
export const putApiTraineeIdPathParamsSchema = z.object({"id": z.number()});
export const putApiTraineeIdMutationRequestSchema = z.lazy(() => traineeViewModelSchema).schema;
import { z } from "zod";

import { classViewModelSchema } from "./classViewModelSchema";

export const putApiOtherbatchesandclassesOtherclassesIdMutationResponseSchema = z.any();
export const putApiOtherbatchesandclassesOtherclassesIdPathParamsSchema = z.object({"id": z.number()});
export const putApiOtherbatchesandclassesOtherclassesIdMutationRequestSchema = z.lazy(() => classViewModelSchema).schema;
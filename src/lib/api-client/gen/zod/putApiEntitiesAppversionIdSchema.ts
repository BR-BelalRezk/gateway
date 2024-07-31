import { z } from "zod";

import { appVersionSchema } from "./appVersionSchema";

export const putApiEntitiesAppversionIdMutationResponseSchema = z.any();
export const putApiEntitiesAppversionIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesAppversionIdMutationRequestSchema = z.lazy(() => appVersionSchema).schema;
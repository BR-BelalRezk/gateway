import { z } from "zod";

import { notesViewModelSchema } from "./notesViewModelSchema";

export const putApiEntitiesNotesIdMutationResponseSchema = z.any();
export const putApiEntitiesNotesIdPathParamsSchema = z.object({"id": z.number()});
export const putApiEntitiesNotesIdMutationRequestSchema = z.lazy(() => notesViewModelSchema).schema;
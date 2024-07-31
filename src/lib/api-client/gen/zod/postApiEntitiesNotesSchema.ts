import { z } from "zod";

import { notesViewModelSchema } from "./notesViewModelSchema";

export const postApiEntitiesNotesMutationResponseSchema = z.any();
export const postApiEntitiesNotesMutationRequestSchema = z.lazy(() => notesViewModelSchema).schema;